import React  from 'react';
import './style.css';
import Button from "../../atoms/Button";
import NewSignOrActionForm from "../../organisms/forms/NewSignOrActionForm";
import {getSignals, getActions} from "../../../helpers/get";
import {Action, Signal} from "../../../helpers/types";
import SignalElement from "../../molecules/Signal";
import ActionElement from "../../molecules/Action";

export default function SignalsAndActions() {
  const [showForm, setShowForm] = React.useState(false);
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

  const signalsHtml = signals.map((signal) => <SignalElement signal={signal} key={`signal-${signal.id}`}/>);
  const actionsHtml = actions.map((action) => <ActionElement action={action} key={`action-${action.id}`}/>);

  return (
    <div className="page">
      <div style={{textAlign: 'center'}}>
        <h1>Signs & Actions</h1>
        <Button text={showForm ? 'cancel' : 'new'} onClick={() => setShowForm(!showForm)} />
      </div>
      {showForm &&
        <NewSignOrActionForm />
      }
      <div>
        <h2>Signals</h2>
        {signalsHtml}
      </div>
      <div>
        <h2>Actions</h2>
        {actionsHtml}
      </div>
    </div>
  )
}
