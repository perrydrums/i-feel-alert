import React  from 'react';
import './style.css';
import Button from "../../atoms/Button";
import NewSignOrActionForm from "../../organisms/forms/NewSignOrActionForm";
import {getSignals, getActions} from "../../../helpers/get";
import {Action, Signal} from "../../../helpers/types";
import SignalElement from "../../molecules/Signal";
import ActionElement from "../../molecules/Action";
import Subtitle from "../../atoms/text/Subtitle";
import StateFilter from "../../atoms/StateFilter";
import MiniSubtitle from "../../atoms/text/MiniSubtitle";
import {getCurrentUser} from "../../../helpers/auth";
import Toolbar from "../../molecules/Toolbar";
import {LinkCircleButton} from "../../atoms/CircleButton";

export default function SignalsAndActions() {
  const [showForm, setShowForm] = React.useState(false);
  const [stateFilter, setStateFilter] = React.useState('all');
  const [signals, setSignals] = React.useState([] as Signal[]);
  const [actions, setActions] = React.useState([] as Action[]);

  React.useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        getSignals(user.id).then((signals) => {
          setSignals(signals);
        });
        getActions(user.id).then((actions) => {
          setActions(actions);
        });
      }
    });
  }, []);

  const signalsHtmlInternal = signals.map((signal) => {
    if (signal.internal && (stateFilter === 'all' || stateFilter === signal.state)) {
      return <SignalElement signal={signal} key={`signal-${signal.id}`}/>
    }
    return null;
  });
  const signalsHtmlExternal = signals.map((signal) => {
    if (!signal.internal && (stateFilter === 'all' || stateFilter === signal.state)) {
      return <SignalElement signal={signal} key={`signal-${signal.id}`}/>
    }
    return null;
  });

  const actionsHtmlInternal = actions.map((action) => {
    if (action.internal && (stateFilter === 'all' || stateFilter === action.state)) {
      return <ActionElement action={action} key={`action-${action.id}`}/>
    }

    return null;
  });

  const actionsHtmlExternal = actions.map((action) => {
    if (!action.internal && (stateFilter === 'all' || stateFilter === action.state)) {
      return <ActionElement action={action} key={`action-${action.id}`}/>
    }

    return null;
  });

  return (
    <>
      <Toolbar button={<LinkCircleButton to={'/me'}>⚙</LinkCircleButton>} />
      <div className="page">
        <div style={{textAlign: 'center'}}>
          <h1>Signs & Actions</h1>
          <Button text={showForm ? 'cancel' : 'new'} onClick={() => setShowForm(!showForm)} />
        </div>
        {showForm &&
          <NewSignOrActionForm />
        }
        <div>
          <div className="saa-header-with-filter">
            <Subtitle theme="default">Signals</Subtitle>
            <StateFilter onClick={(state) => setStateFilter(state)} />
          </div>
          <MiniSubtitle theme="default">Internal</MiniSubtitle>
          <div>{signalsHtmlInternal}</div>
          <MiniSubtitle theme="default">External</MiniSubtitle>
          <div>{signalsHtmlExternal}</div>
        </div>
        <div>
          <Subtitle theme="default">Actions</Subtitle>
          <MiniSubtitle theme="default">Internal</MiniSubtitle>
          <div>{actionsHtmlInternal}</div>
          <MiniSubtitle theme="default">External</MiniSubtitle>
          <div>{actionsHtmlExternal}</div>
        </div>
      </div>
    </>
  )
}
