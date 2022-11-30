import React  from 'react';
import './style.css';
import Button from "../../atoms/Button";
import NewSignOrActionForm from "../../organisms/forms/NewSignOrActionForm";
import {getSignals, getActions, getUser} from "../../../helpers/get";
import {Action, Signal, UserData} from "../../../helpers/types";

export default function SignalsAndActions() {
  const [showForm, setShowForm] = React.useState(false);
  const [user, setUser] = React.useState({} as UserData);
  const [signals, setSignals] = React.useState([] as Signal[]);
  const [actions, setActions] = React.useState([] as Action[]);
  const username = 'perry';

  React.useEffect(() => {
    getUser(username).then((user) => {
      setUser(user);
    });
    getSignals(username).then((signals) => {
      setSignals(signals);
    });
    getActions(username).then((actions) => {
      setActions(actions);
    });
  }, []);

  // create signals html
  const signalsHtml = signals.map((signal) =>
    <div className="signal-preview" key={`signal-${signal.id}`}>
      <div className="signal__state">{signal.state}</div>
      <div className="signal__name">{signal.description}</div>
    </div>
  );

  // create actions html
  const actionsHtml = actions.map((action) =>
    <div className="action-preview" key={`action-${action.id}`}>
      <div className="signal__state">{action.state}</div>
      <div className="signal__name">{action.description}</div>
    </div>
  );

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
