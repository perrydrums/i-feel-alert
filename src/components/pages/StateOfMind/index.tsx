import React, {useRef} from 'react';
import {supabase} from '../../../helpers/client';
import './style.css';
import '../style.css';
import Text from '../../atoms/text';
import Title from "../../atoms/text/Title";
import StateIndicator from "../../molecules/StateIndicator";
import Button from "../../atoms/Button";
import {getStateOfUser, getSupporting} from "../../../helpers/get";
import HowToHelp from "./HowToHelp";
import WhatAreTheSigns from "./WhatAreTheSigns";
import {sendMessage} from "../../../helpers/whatsapp";
import Toolbar from "../../molecules/Toolbar";
import {LinkCircleButton} from "../../atoms/CircleButton";
import {User} from "../../../helpers/types";
import {useUserContext} from "../../../context/User";

export default function StateOfMind() {
  const user = useUserContext();
  const [stateOfMind, _setStateOfMind] = React.useState(localStorage.getItem('lastStateOfMind') || 'unknown');
  const [show, setShow] = React.useState('all');
  const [sharer, setSharer] = React.useState<User>();

  const howToHelpRef = useRef<null | HTMLDivElement>(null);
  const scroll = () => {
    if (howToHelpRef && howToHelpRef.current) {
      howToHelpRef.current.scrollIntoView()
    }
  };

  const setStateOfMind = (state: string) => {
    _setStateOfMind(state);
    localStorage.setItem('lastStateOfMind', state);
  }

  React.useEffect(() => {
    const addListener = (sharer: User) => {
      supabase
        .channel('public:user_state')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_state' }, payload => {
          if (payload.new.user_id === sharer.id) {
            setStateOfMind(payload.new.state);
          }
        })
        .subscribe();
    }

    const getStateOfMind = async (user: User) => {
      if (user.type === 'sharer') {
        setStateOfMind(await getStateOfUser(user.id));
        setSharer(user);
        addListener(user);
      }
      else {
        const sharer = await getSupporting(user.id);
        if (sharer) {
          setStateOfMind(await getStateOfUser(sharer.id));
          setSharer(sharer);
          addListener(sharer);
        }
      }
    }

    if (user) {
      getStateOfMind(user);
    }
  }, [user])

  async function updateStateOfUser(state: string) {
    if (user) {
      await supabase
        .from('user_state')
        .update({state: state})
        .eq('user_id', user.id);

      await sendMessage('31650126861', `${user.name} is feeling ${state} now. Please check on him. For help visit https://ifeel-alert.netlify.app`);
      setStateOfMind(state);
    }
  }

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
    <div className={stateOfMind}>
      <Toolbar title={`Welcome, ${user?.name}`}
               button={<LinkCircleButton state={stateOfMind} to="/me">⚙</LinkCircleButton>}
      />
      <div className="page">
        <div className="som-title-container">
          {user?.type === 'sharer'
            ? <Title theme={stateOfMind}>I'm feeling</Title>
            : <>
              <Text theme={stateOfMind}>{sharer?.name || '&nbsp;'}</Text>
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
    </div>
  );
}
