import React from 'react';
import {Signal} from "../../../helpers/types";
import './style.css';
import {CircleButton} from "../../atoms/CircleButton";

export default function SignalElement({signal, border}: {signal: Signal, border?: boolean}) {
  return (
    <div className={`signal ${border && `signal--${signal.state}`}`}
         key={`signal-${signal.id}`}
    >
      <p>{signal.description}</p>
      <CircleButton size="24px" onClick={() => {}}>🗑</CircleButton>

    </div>
  )
}
