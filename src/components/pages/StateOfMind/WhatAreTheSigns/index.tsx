import React from "react";

import { Advice } from "../../../../helpers/types";
import Subtitle from "../../../atoms/Text/Subtitle";
import AdviceItem from "../../../molecules/AdviceItem";
import "./style.css";

export default function WhatAreTheSigns({
  items,
  state = "default",
}: {
  items: Advice[];
  state: string;
}) {
  const adviceHtml = items.map((advice) => (
    <AdviceItem advice={advice} key={`signal-${advice.id}`} />
  ));

  return (
    <div className="what-are-the-signs">
      <Subtitle theme={state}>What are the signs?</Subtitle>
      <div>{adviceHtml}</div>
    </div>
  );
}
