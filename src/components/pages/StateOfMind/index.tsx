import React, {useRef} from 'react';
import {supabase} from '../../../helpers/client';
import './style.css';
import '../style.css';
import Text from '../../atoms/text';
import Title from "../../atoms/text/Title";
import StateIndicator from "../../molecules/StateIndicator";
import Button from "../../atoms/Button";
import {getStateOfUser} from "../../../helpers/get";
import HowToHelp from "./HowToHelp";
import WhatAreTheSigns from "./WhatAreTheSigns";
import {sendMessage} from "../../../helpers/whatsapp";
import Toolbar from "../../molecules/Toolbar";
import {LinkCircleButton} from "../../atoms/CircleButton";
import {getCurrentUser} from "../../../helpers/auth";
import {User} from "../../../helpers/types";

export default function StateOfMind() {
  const [stateOfMind, setStateOfMind] = React.useState('unknown');
  const [show, setShow] = React.useState('all');
  const [user, setUser] = React.useState<User | null>(null);

  const howToHelpRef = useRef<null | HTMLDivElement>(null);
  const scroll = () => {
    if (howToHelpRef && howToHelpRef.current) {
      howToHelpRef.current.scrollIntoView()
    }
  };

  React.useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        setUser(user);
        getStateOfUser(user?.username).then((state) => {
          setStateOfMind(state);
        });

        supabase
          .channel('public:user_state')
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_state' }, payload => {
            if (payload.new.username === user.username) {
              setStateOfMind(payload.new.state);
            }
          })
          .subscribe();
      }
    });
  }, [])

  async function updateStateOfUser(state: string) {
    await supabase
      .from('user_state')
      .update({state: state})
      .eq('username', user?.username)

    await sendMessage('31650126861', `${user?.name} is feeling ${state} now. Please check on him. For help visit https://ifeel-alert.netlify.app`);
    setStateOfMind(state);
  }

  const themeClass = stateOfMind === 'unknown' ? '' : `bg--${stateOfMind}`;

  const actionButtonText = () => {
    switch (true) {
      case stateOfMind === 'green':
        return 'Keep this up!';
      case user?.type === 'sharer':
        return 'What can I do?';
      case user?.type === 'listener':
        return 'How can I help?';
      default:
        return 'How can I help?';
    }
  };

  return (
    <>
      <Toolbar title={`Welcome, ${user?.name}`}
               state={stateOfMind}
               button={<LinkCircleButton state={stateOfMind} to="/me">⚙</LinkCircleButton>}
      />
      <div className={'page ' + themeClass}>
        <div className="som-title-container">
          {user?.type === 'sharer'
            ? <Title theme={stateOfMind}>I'm feeling</Title>
            : <>
              <Text theme={stateOfMind}>{user?.name || '&nbsp;'}</Text>
              <Title theme={stateOfMind}>currently feels</Title>
            </>
          }
        </div>
        <StateIndicator state={stateOfMind}
                        update={user?.type === 'sharer' ? updateStateOfUser : null}
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
            <HowToHelp state={stateOfMind} userType={user?.type || ''} />
          </div>
        }
        {show === 'signs' &&
          <div ref={howToHelpRef}>
            <WhatAreTheSigns state={stateOfMind} userType={user?.type || ''} />
          </div>
        }
      </div>
    </>
  );
}
