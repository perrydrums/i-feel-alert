import React from 'react';
import Subtitle from "../../../atoms/text/Subtitle";
import {Signal} from "../../../../helpers/types";
import {getSignals} from "../../../../helpers/get";
import './style.css';

export default function WhatAreTheSigns({state = 'default'}: {state: string}) {
  const [signals, setSignals] = React.useState([] as Signal[]);
  const username = 'perry';

  React.useEffect(() => {
    getSignals(username).then((signals) => {
      setSignals(signals);
    });
  }, []);

  // create signals html
  const signalsHtml = signals.map((signal) => {
    if (signal.state === state) {
      return (
        <div className="signal-preview" key={`signal-${signal.id}`}>
          <div className="signal__name">{signal.description}</div>
        </div>
      );
    }
    return null;
  }

  );

  return <div className="what-are-the-signs">
    <Subtitle theme={state}>What are the signs?</Subtitle>
    <div>
      {signalsHtml}
    </div>
  </div>;
}
