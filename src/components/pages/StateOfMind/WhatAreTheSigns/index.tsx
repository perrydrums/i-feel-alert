import React from 'react';
import Subtitle from "../../../atoms/text/Subtitle";
import {Signal} from "../../../../helpers/types";
import {getSignals} from "../../../../helpers/get";
import './style.css';
import SignalElement from "../../../molecules/Signal";

export default function WhatAreTheSigns({state = 'default', userType}: {state: string, userType: string}) {
  const [signals, setSignals] = React.useState([] as Signal[]);
  const username = 'perry';

  React.useEffect(() => {
    getSignals(username, {state, internal: userType === 'sharer'}).then((signals) => {
      setSignals(signals);
    });
  }, [state, userType]);

  const signalsHtml = signals.map((signal) => <SignalElement signal={signal} key={`signal-${signal.id}`}/>);

  return (
    <div className="what-are-the-signs">
      <Subtitle theme={state}>What are the signs?</Subtitle>
      <div>
        {signalsHtml}
      </div>
    </div>
  );
}
