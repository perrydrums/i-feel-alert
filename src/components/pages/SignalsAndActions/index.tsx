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
import Toolbar from "../../molecules/Toolbar";
import {LinkCircleButton} from "../../atoms/CircleButton";
import {useUserContext} from "../../../context/User";

export default function SignalsAndActions() {
  const [showForm, setShowForm] = React.useState(false);
  const [stateFilter, setStateFilter] = React.useState('all');
  const [signals, setSignals] = React.useState([] as Signal[]);
  const [actions, setActions] = React.useState([] as Action[]);
  const user = useUserContext();

  React.useEffect(() => {
    if (user) {
      getSignals(user.id).then((signals) => {
        setSignals(signals);
      });
      getActions(user.id).then((actions) => {
        setActions(actions);
      });
    }
  }, [user]);

  const signalsHtmlInternal = signals.map((signal) => {
    if (signal.internal && (stateFilter === 'all' || stateFilter === signal.state)) {
      return <SignalElement signal={signal} border={true} key={`signal-${signal.id}`}/>
    }
    return null;
  }).filter(a => a);

  const signalsHtmlExternal = signals.map((signal) => {
    if (!signal.internal && (stateFilter === 'all' || stateFilter === signal.state)) {
      return <SignalElement signal={signal} border={true} key={`signal-${signal.id}`}/>
    }
    return null;
  }).filter(a => a);

  const actionsHtmlInternal = actions.map((action) => {
    if (action.internal && (stateFilter === 'all' || stateFilter === action.state)) {
      return <ActionElement action={action} border={true} key={`action-${action.id}`}/>
    }

    return null;
  }).filter(a => a);

  const actionsHtmlExternal = actions.map((action) => {
    if (!action.internal && (stateFilter === 'all' || stateFilter === action.state)) {
      return <ActionElement action={action} border={true} key={`action-${action.id}`}/>
    }

    return null;
  }).filter(a => a);

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
          {signalsHtmlInternal.length > 0 &&
            <>
              <MiniSubtitle theme="default">Internal</MiniSubtitle>
              <div>{signalsHtmlInternal}</div>
            </>
          }
          {signalsHtmlExternal.length > 0 &&
            <>
              <MiniSubtitle theme="default">External</MiniSubtitle>
              <div>{signalsHtmlExternal}</div>
            </>
          }
        </div>
        <div>
          <Subtitle theme="default">Actions</Subtitle>
          {actionsHtmlInternal.length > 0 &&
            <>
              <MiniSubtitle theme="default">Internal</MiniSubtitle>
              <div>{actionsHtmlInternal}</div>
            </>
          }
          {actionsHtmlExternal.length > 0 &&
            <>
              <MiniSubtitle theme="default">External</MiniSubtitle>
              <div>{actionsHtmlExternal}</div>
            </>
          }
        </div>
      </div>
    </>
  )
}
