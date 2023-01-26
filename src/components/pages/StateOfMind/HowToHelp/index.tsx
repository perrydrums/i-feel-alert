import React from "react";
import Subtitle from "../../../atoms/text/Subtitle";
import "./style.css";
import { Advice } from "../../../../helpers/types";
import AdviceItem from "../../../molecules/AdviceItem";

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
