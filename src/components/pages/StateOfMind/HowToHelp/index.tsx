import React from 'react';
import Subtitle from "../../../atoms/text/Subtitle";
import './style.css';
import {Action} from "../../../../helpers/types";
import {getActions} from "../../../../helpers/get";
import ActionElement from "../../../molecules/Action";
import {getCurrentUser} from "../../../../helpers/auth";

export default function HowToHelp({state = 'default', userType}: {state: string, userType: string}) {
  const [actions, setActions] = React.useState([] as Action[]);

  React.useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        getActions(user.id, {state, internal: user.type === 'sharer'}).then((actions) => {
          setActions(actions);
        });
      }
    });
  }, [state, userType]);

  const actionsHtml = actions.map((action) => <ActionElement action={action} key={`action-${action.id}`}/>);

  return (
    <div className="how-to-help">
      <Subtitle theme={state}>What you can do:</Subtitle>
      <div>
        {actionsHtml}
      </div>
    </div>
  );
}
