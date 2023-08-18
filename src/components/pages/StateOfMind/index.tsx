import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";

import { useUserContext } from "../../../context/User";
import { supabase } from "../../../helpers/client";
import {
  getActions,
  getSignals,
  getStateOfUser,
  getSupporting,
} from "../../../helpers/get";
import { email, push } from "../../../helpers/notify";
import { Advice, User } from "../../../helpers/types";
import Button from "../../atoms/Button";
import { LinkCircleButton } from "../../atoms/CircleButton";
import Loading from "../../atoms/Loading";
import Text from "../../atoms/Text";
import Title from "../../atoms/Text/Title";
import Gear from "../../atoms/svg/Gear";
import StateIndicator from "../../molecules/StateIndicator";
import Toolbar from "../../molecules/Toolbar";
import "../style.css";
import HowToHelp from "./HowToHelp";
import WhatAreTheSigns from "./WhatAreTheSigns";
import "./style.css";

export default function StateOfMind() {
  const [loading, setLoading] = React.useState(true);
  const user = useUserContext();
  const [stateOfMind, _setStateOfMind] = React.useState(
    localStorage.getItem("lastStateOfMind") || "unknown"
  );
  const [show, setShow] = React.useState("all");
  const [sharer, setSharer] = React.useState<User>();
  const [actions, setActions] = React.useState([] as Advice[]);
  const [signals, setSignals] = React.useState([] as Advice[]);

  const howToHelpRef = useRef<null | HTMLDivElement>(null);
  const scroll = () => {
    if (howToHelpRef && howToHelpRef.current) {
      howToHelpRef.current.scrollIntoView();
    }
  };

  const setStateOfMind = (state: string) => {
    _setStateOfMind(state);
    localStorage.setItem("lastStateOfMind", state);
  };

  React.useEffect(() => {
    const addListener = (sharer: User) => {
      supabase
        .channel("public:user_state")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "user_state" },
          (payload) => {
            if (payload.new.user_id === sharer.id) {
              setStateOfMind(payload.new.state);
            }
          }
        )
        .subscribe();
    };

    const getStateOfMind = async (user: User) => {
      const sharer =
        user.type === "sharer" ? user : await getSupporting(user.id);
      if (sharer) {
        const state = await getStateOfUser(sharer.id);
        setStateOfMind(state);
        setSharer(sharer);
        addListener(sharer);
        setActions(
          await getActions(user.id, { internal: user.type === "sharer" })
        );
        setSignals(
          await getSignals(user.id, { internal: user.type === "sharer" })
        );
      }
      setLoading(false);
    };

    if (user) {
      getStateOfMind(user);
    }
  }, [user]);

  async function updateStateOfUser(state: string) {
    if (user) {
      setStateOfMind(state);

      await supabase
        .from("user_state")
        .update({ state: state })
        .eq("user_id", user.id);

      // Only send push notification if the state is decreased.
      if (state === "red" || (state === "yellow" && stateOfMind === "green")) {
        email(user.id, state);
        push(user.id, state);
      }
    }
  }

  const actionButtonText = () => {
    switch (true) {
      case stateOfMind === "green":
        return "Keep this up!";
      case user?.type === "sharer":
        return "What can I do?";
      case user?.type === "listener":
        return "How can I help?";
      default:
        return "How can I help?";
    }
  };

  return (
    <>
      <Helmet>
        <body className={stateOfMind}></body>
      </Helmet>
      <Toolbar
        title={`Welcome, ${user?.name}`}
        button={
          <LinkCircleButton state={stateOfMind} to="/me">
            <Gear />
          </LinkCircleButton>
        }
      />
      <div className="page">
        {loading ? (
          <div style={{ marginTop: "150px" }}>
            <Loading small={true} themed={true} />
          </div>
        ) : (
          <>
            {sharer ? (
              <>
                <div className="som-title-container">
                  {user?.type === "sharer" ? (
                    <Title theme={stateOfMind}>I'm feeling</Title>
                  ) : (
                    <>
                      <Text>{sharer?.name || <>&nbsp;</>}</Text>
                      <Title theme={stateOfMind}>currently feels</Title>
                    </>
                  )}
                </div>
                <StateIndicator
                  state={stateOfMind}
                  update={user?.type === "sharer" ? updateStateOfUser : null}
                />
                {(show === "all" || show === "signs") && (
                  <Button
                    state={stateOfMind}
                    text={actionButtonText()}
                    pulse={true}
                    rounded={true}
                    onClick={async () => {
                      await setShow("actions");
                      scroll();
                    }}
                  />
                )}
                {(show === "all" || show === "actions") && (
                  <Button
                    state={stateOfMind}
                    text="What are the signs?"
                    pulse={true}
                    rounded={true}
                    onClick={async () => {
                      await setShow("signs");
                      scroll();
                    }}
                  />
                )}
                {show === "actions" && (
                  <div ref={howToHelpRef}>
                    <HowToHelp
                      items={actions.filter(
                        (action) => action.state === stateOfMind
                      )}
                      state={stateOfMind}
                    />
                  </div>
                )}
                {show === "signs" && (
                  <div ref={howToHelpRef}>
                    <WhatAreTheSigns
                      items={signals.filter(
                        (signal) => signal.state === stateOfMind
                      )}
                      state={stateOfMind}
                    />
                  </div>
                )}
              </>
            ) : (
              <>You are not supporting someone right now.</>
            )}
          </>
        )}
      </div>
    </>
  );
}
