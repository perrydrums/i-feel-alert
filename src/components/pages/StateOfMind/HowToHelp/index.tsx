import React from "react";

import { Advice } from "../../../../helpers/types";
import Subtitle from "../../../atoms/Text/Subtitle";
import AdviceItem from "../../../molecules/AdviceItem";
import "./style.css";

export default function HowToHelp({
  items,
  state = "default",
}: {
  items: Advice[];
  state: string;
}) {
  const adviceHtml = items.map((advice) => (
    <AdviceItem advice={advice} key={`action-${advice.id}`} />
  ));

  return (
    <div className="how-to-help">
      <Subtitle theme={state}>What you can do:</Subtitle>
      <div>{adviceHtml}</div>
    </div>
  );
}
