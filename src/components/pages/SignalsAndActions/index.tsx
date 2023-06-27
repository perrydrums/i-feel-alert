import React from "react";
import { Helmet } from "react-helmet-async";

import { useUserContext } from "../../../context/User";
import { supabase } from "../../../helpers/client";
import { getActions, getSignals } from "../../../helpers/get";
import { Advice } from "../../../helpers/types";
import Button from "../../atoms/Button";
import ButtonContainer from "../../atoms/ButtonContainer";
import { LinkCircleButton } from "../../atoms/CircleButton";
import Loading from "../../atoms/Loading";
import StateFilter from "../../atoms/StateFilter";
import Text from "../../atoms/Text";
import MiniSubtitle from "../../atoms/Text/MiniSubtitle";
import Subtitle from "../../atoms/Text/Subtitle";
import Gear from "../../atoms/svg/Gear";
import AdviceItem from "../../molecules/AdviceItem";
import Toolbar from "../../molecules/Toolbar";
import NewSignOrActionForm from "../../organisms/forms/NewSignOrActionForm";
import "./style.css";

export default function SignalsAndActions() {
  const user = useUserContext();
  const [loading, setLoading] = React.useState(true);
  const [formType, _setFormType] = React.useState(
    "" as "signal" | "action" | ""
  );
  const [stateFilter, setStateFilter] = React.useState("all");
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

  function setFormType(type: "signal" | "action") {
    if (formType === type) {
      _setFormType("");
    } else {
      _setFormType(type);
    }
  }

  function closeForm() {
    _setFormType("");
    window.location.reload();
  }

  async function deleteFromDatabase(id: number, type: "signal" | "action") {
    await supabase.from(`${type}s`).delete().eq("id", id);

    if (type === "signal") {
      setSignals(signals.filter((s) => s.id !== id));
    }
    if (type === "action") {
      setActions(actions.filter((a) => a.id !== id));
    }
  }

  const signalsHtmlInternal = signals
    .map((signal) => {
      if (
        signal.internal &&
        (stateFilter === "all" || stateFilter === signal.state)
      ) {
        return (
          <AdviceItem
            advice={signal}
            deleteFunction={() => deleteFromDatabase(signal.id, "signal")}
            key={`signal-${signal.id}`}
          />
        );
      }
      return null;
    })
    .filter((a) => a);

  const signalsHtmlExternal = signals
    .map((signal) => {
      if (
        !signal.internal &&
        (stateFilter === "all" || stateFilter === signal.state)
      ) {
        return (
          <AdviceItem
            advice={signal}
            deleteFunction={() => deleteFromDatabase(signal.id, "signal")}
            key={`signal-${signal.id}`}
          />
        );
      }
      return null;
    })
    .filter((a) => a);

  const actionsHtmlInternal = actions
    .map((action) => {
      if (
        action.internal &&
        (stateFilter === "all" || stateFilter === action.state)
      ) {
        return (
          <AdviceItem
            advice={action}
            deleteFunction={() => deleteFromDatabase(action.id, "action")}
            key={`action-${action.id}`}
          />
        );
      }
      return null;
    })
    .filter((a) => a);

  const actionsHtmlExternal = actions
    .map((action) => {
      if (
        !action.internal &&
        (stateFilter === "all" || stateFilter === action.state)
      ) {
        return (
          <AdviceItem
            advice={action}
            deleteFunction={() => deleteFromDatabase(action.id, "action")}
            key={`action-${action.id}`}
          />
        );
      }
      return null;
    })
    .filter((a) => a);

  return !loading ? (
    <>
      <Helmet>
        <body className="black"></body>
      </Helmet>
      <Toolbar
        button={
          <LinkCircleButton to={"/me"}>
            <Gear />
          </LinkCircleButton>
        }
      />
      <div className="page">
        <h1>Signs & Actions</h1>
        <Text>Here you can add your own signs and actions.</Text>
        <ButtonContainer>
          <Button
            text={formType === "signal" ? "cancel" : "New Signal"}
            onClick={() => setFormType("signal")}
            small={true}
          />
          <Button
            text={formType === "action" ? "cancel" : "New Action"}
            onClick={() => setFormType("action")}
            small={true}
          />
        </ButtonContainer>
        {!!formType && (
          <NewSignOrActionForm type={formType} onClose={closeForm} />
        )}
        <div>
          <div className="saa-header-with-filter">
            <Subtitle theme="default">Signals</Subtitle>
            <StateFilter onClick={(state) => setStateFilter(state)} />
          </div>
          {signalsHtmlInternal.length > 0 && (
            <>
              <MiniSubtitle theme="default">Internal</MiniSubtitle>
              <div>{signalsHtmlInternal}</div>
            </>
          )}
          {signalsHtmlExternal.length > 0 && (
            <>
              <MiniSubtitle theme="default">External</MiniSubtitle>
              <div>{signalsHtmlExternal}</div>
            </>
          )}
        </div>
        <div>
          <Subtitle theme="default">Actions</Subtitle>
          {actionsHtmlInternal.length > 0 && (
            <>
              <MiniSubtitle theme="default">Internal</MiniSubtitle>
              <div>{actionsHtmlInternal}</div>
            </>
          )}
          {actionsHtmlExternal.length > 0 && (
            <>
              <MiniSubtitle theme="default">External</MiniSubtitle>
              <div>{actionsHtmlExternal}</div>
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}
