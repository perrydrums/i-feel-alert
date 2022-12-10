import React from 'react';
import {Signal} from "../../../helpers/types";
import './style.css';
import {CircleButton} from "../../atoms/CircleButton";

export default function SignalElement({signal}: {signal: Signal}) {
  return (
    <div className={`signal signal--${signal.state}`}
         key={`signal-${signal.id}`}
    >
      <p>{signal.description}</p>
      <CircleButton size="24px" onClick={() => {}}>🗑</CircleButton>

    </div>
  )
}
