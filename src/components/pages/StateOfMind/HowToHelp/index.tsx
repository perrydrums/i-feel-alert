import React from 'react';
import Subtitle from "../../../atoms/text/Subtitle";
import './style.css';
import {Action} from "../../../../helpers/types";
import {getActions} from "../../../../helpers/get";
import ActionElement from "../../../molecules/Action";

export default function HowToHelp({state = 'default'}: {state: string}) {
  const [actions, setActions] = React.useState([] as Action[]);
  const username = 'perry';

  React.useEffect(() => {
    getActions(username, {state, internal: false}).then((actions) => {
      setActions(actions);
    });
  }, [state]);

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
