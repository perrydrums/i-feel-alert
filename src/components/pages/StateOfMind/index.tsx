import React, {useRef} from 'react';
import {supabase} from '../../../helpers/client';
import './style.css';
import '../style.css';
import Text from '../../atoms/text';
import Title from "../../atoms/text/Title";
import StateIndicator from "../../molecules/StateIndicator";
import Button from "../../atoms/Button";
import {getStateOfUser, getUser} from "../../../helpers/get";
import HowToHelp from "./HowToHelp";
import WhatAreTheSigns from "./WhatAreTheSigns";

export default function StateOfMind({userType}: { userType: string }) {
  const [stateOfMind, setStateOfMind] = React.useState('loading');
  const [show, setShow] = React.useState('all');
  const [user, setUser] = React.useState({name: '', type: ''});
  const username = 'perry';

  const howToHelpRef = useRef(null);
  // @ts-ignore
  const scroll = () => howToHelpRef !== null && howToHelpRef.current.scrollIntoView();

  React.useEffect(() => {
    getUser(username).then((user) => {
      setUser(user);
    });
    getStateOfUser(username).then((state) => {
      setStateOfMind(state);
    });

  }, [])

  async function updateStateOfUser(username: string, state: string) {
    await supabase
      .from('user_state')
      .update({state: state})
      .eq('username', username)

    setStateOfMind(state);
  }

  const themeClass = stateOfMind === 'unknown' ? '' : `bg--${stateOfMind}`;

  const states = ['red', 'yellow', 'green'];
  const updateButtons = states.map((s) => {
    if (s !== stateOfMind) {
      return (
        <Button state={stateOfMind}
                text={s}
                onClick={() => updateStateOfUser(username, s)}
                key={`update-${s}`}
        />
      )
    }
    return null;
  })

  return <div className={'page ' + themeClass}>
    <div className="som-title-container">
      {userType === 'sharer'
        ? <Title theme={stateOfMind}>I'm feeling</Title>
        : <>
          <Text theme={stateOfMind}>{user.name}</Text>
          <Title theme={stateOfMind}>currently feels</Title>
        </>
      }

    </div>
    <StateIndicator state={stateOfMind}/>
    {userType === 'sharer'
      ? <>{updateButtons}</>
      : <>
        {(show === 'all' || show === 'signs') &&
          <Button state={stateOfMind}
                  text="How can I help?"
                  onClick={async () => {
                    await setShow('actions');
                      scroll();
                  }}
          />
        }
        {(show === 'all' || show === 'actions') &&
          <Button state={stateOfMind}
                  text="What are the signs?"
                  onClick={async () => {
                    await setShow('signs');
                      scroll();
                  }}
          />
        }
      </>
    }
    {show === 'actions' &&
      <div ref={howToHelpRef}>
        <HowToHelp state={stateOfMind} />
      </div>
    }
    {show === 'signs' &&
      <div ref={howToHelpRef}>
        <WhatAreTheSigns state={stateOfMind} />
      </div>
    }
  </div>;
}
