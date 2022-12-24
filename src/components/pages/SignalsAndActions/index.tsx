import React  from 'react';
import './style.css';
import Button from "../../atoms/Button";
import NewSignOrActionForm from "../../organisms/forms/NewSignOrActionForm";
import {getSignals, getActions} from "../../../helpers/get";
import {Advice} from "../../../helpers/types";
import Subtitle from "../../atoms/text/Subtitle";
import StateFilter from "../../atoms/StateFilter";
import MiniSubtitle from "../../atoms/text/MiniSubtitle";
import Toolbar from "../../molecules/Toolbar";
import {LinkCircleButton} from "../../atoms/CircleButton";
import {useUserContext} from "../../../context/User";
import AdviceItem from "../../molecules/AdviceItem";
import {supabase} from "../../../helpers/client";
import Loading from "../../atoms/Loading";
import Gear from "../../atoms/svg/Gear";

export default function SignalsAndActions() {
  const user = useUserContext();
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [stateFilter, setStateFilter] = React.useState('all');
  const [signals, setSignals] = React.useState([] as Advice[]);
  const [actions, setActions] = React.useState([] as Advice[]);

  React.useEffect(() => {
    if (user) {
      getSignals(user.id).then((signals) => {
        setSignals(signals);
        getActions(user.id).then((actions) => {
          setActions(actions);
          setLoading(false);
        });
      });
    }
  }, [user]);

  async function deleteFromDatabase(id: number, type: 'signal' | 'action') {
    await supabase
      .from(`${type}s`)
      .delete()
      .eq('id', id);

    if (type === 'signal') {
      setSignals(signals.filter(s => s.id !== id));
    }
    if (type === 'action') {
      setActions(actions.filter(a => a.id !== id));
    }
  }

  const signalsHtmlInternal = signals.map((signal) => {
    if (signal.internal && (stateFilter === 'all' || stateFilter === signal.state)) {
      return <AdviceItem advice={signal}
                         deleteFunction={() => deleteFromDatabase(signal.id, 'signal')}
                         key={`signal-${signal.id}`}/>
    }
    return null;
  }).filter(a => a);

  const signalsHtmlExternal = signals.map((signal) => {
    if (!signal.internal && (stateFilter === 'all' || stateFilter === signal.state)) {
      return <AdviceItem advice={signal}
                         deleteFunction={() => deleteFromDatabase(signal.id, 'signal')}
                         key={`signal-${signal.id}`}/>
    }
    return null;
  }).filter(a => a);

  const actionsHtmlInternal = actions.map((action) => {
    if (action.internal && (stateFilter === 'all' || stateFilter === action.state)) {
      return <AdviceItem advice={action}
                         deleteFunction={() => deleteFromDatabase(action.id, 'action')}
                         key={`action-${action.id}`}/>
    }
    return null;
  }).filter(a => a);

  const actionsHtmlExternal = actions.map((action) => {
    if (!action.internal && (stateFilter === 'all' || stateFilter === action.state)) {
      return <AdviceItem advice={action}
                         deleteFunction={() => deleteFromDatabase(action.id, 'action')}
                         key={`action-${action.id}`}/>
    }
    return null;
  }).filter(a => a);

  return !loading ? (
    <>
      <Toolbar button={<LinkCircleButton to={'/me'}><Gear/></LinkCircleButton>} />
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
  ) : <Loading />;
}
