import React from 'react';
import {Action} from "../../../helpers/types";
import './style.css';

export default function ActionElement({action}: {action: Action}) {
  return (
    <div className={`action bg--${action.state} text--${action.state}`}
         key={`signal-${action.id}`}
    >
      <p>{action.description}</p>
    </div>
  )
}
