import React from 'react';
import Subtitle from "../../../atoms/text/Subtitle";
import './style.css';
import {Action, Signal} from "../../../../helpers/types";
import {getActions, getSignals} from "../../../../helpers/get";

export default function HowToHelp({state = 'default'}: {state: string}) {
  const [signals, setSignals] = React.useState([] as Signal[]);
  const [actions, setActions] = React.useState([] as Action[]);
  const username = 'perry';

  React.useEffect(() => {
    getSignals(username).then((signals) => {
      setSignals(signals);
    });
    getActions(username).then((actions) => {
      setActions(actions);
    });
  }, []);

  // create actions html
  const actionsHtml = actions.map((action) => {
    if (action.state === state) {
      return (
        <div className="signal-preview" key={`signal-${action.id}`}>
          <div className="signal__name">{action.description}</div>
        </div>
      );
    }
    return null;
  });

  return <div className="how-to-help">
    <Subtitle theme={state}>What you can do:</Subtitle>
    <div>
      {actionsHtml}
    </div>
  </div>;
}
