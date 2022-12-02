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
import {sendMessage} from "../../../helpers/whatsapp";

export default function StateOfMind({userType}: { userType: string }) {
  const [stateOfMind, setStateOfMind] = React.useState('loading');
  const [show, setShow] = React.useState('all');
  const [user, setUser] = React.useState({name: '', type: ''});
  const username = 'perry';

  const howToHelpRef = useRef<null | HTMLDivElement>(null);
  const scroll = () => {
    if (howToHelpRef && howToHelpRef.current) {
      howToHelpRef.current.scrollIntoView()
    }
  };

  React.useEffect(() => {
    getUser(username).then((user) => {
      setUser(user);
    });
    getStateOfUser(username).then((state) => {
      setStateOfMind(state);
    });

    supabase
      .channel('public:user_state')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_state' }, payload => {
        if (payload.new.username === username) {
          setStateOfMind(payload.new.state);
        }
      })
      .subscribe();

  }, [])

  async function updateStateOfUser(state: string) {
    await supabase
      .from('user_state')
      .update({state: state})
      .eq('username', username)

    await sendMessage('31650126861', `${user.name} is feeling ${state} now. Please check on him. For help visit https://ifeel-alert.netlify.app`);
    setStateOfMind(state);
  }

  const themeClass = stateOfMind === 'unknown' ? '' : `bg--${stateOfMind}`;

  const actionButtonText = () => {
    switch (true) {
      case stateOfMind === 'green':
        return 'Keep this up!';
      case userType === 'sharer':
        return 'What can I do?';
      case userType === 'listener':
        return 'How can I help?';
      default:
        return 'How can I help?';
    }
  };

  return <div className={'page ' + themeClass}>
    <div className="som-title-container">
      {userType === 'sharer'
        ? <Title theme={stateOfMind}>I'm feeling</Title>
        : <>
          <Text theme={stateOfMind}>{user.name || '&nbsp;'}</Text>
          <Title theme={stateOfMind}>currently feels</Title>
        </>
      }

    </div>
    <StateIndicator state={stateOfMind}
                    update={userType === 'sharer' ? updateStateOfUser : null}
    />
    {(show === 'all' || show === 'signs') &&
      <Button state={stateOfMind}
              text={actionButtonText()}
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
    {show === 'actions' &&
      <div ref={howToHelpRef}>
        <HowToHelp state={stateOfMind} userType={userType} />
      </div>
    }
    {show === 'signs' &&
      <div ref={howToHelpRef}>
        <WhatAreTheSigns state={stateOfMind} userType={userType} />
      </div>
    }
  </div>;
}
