import React from 'react';
import {Signal} from "../../../helpers/types";
import './style.css';

export default function SignalElement({signal}: {signal: Signal}) {
  return (
    <div className={`signal bg--${signal.state} theme--${signal.state}`}
         key={`signal-${signal.id}`}
    >
      <p>{signal.description}</p>
    </div>
  )
}
