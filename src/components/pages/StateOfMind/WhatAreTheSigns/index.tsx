import React from 'react';
import Subtitle from "../../../atoms/text/Subtitle";
import {Advice} from "../../../../helpers/types";
import './style.css';
import AdviceItem from "../../../molecules/AdviceItem";

export default function WhatAreTheSigns({items, state = 'default'}: {items: Advice[], state: string}) {
  const adviceHtml = items.map((advice) => <AdviceItem advice={advice} key={`signal-${advice.id}`}/>);

  return (
    <div className="what-are-the-signs">
      <Subtitle theme={state}>What are the signs?</Subtitle>
      <div>
        {adviceHtml}
      </div>
    </div>
  );
}
