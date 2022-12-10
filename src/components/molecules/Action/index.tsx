import React from 'react';
import {Action} from "../../../helpers/types";
import './style.css';
import {CircleButton} from "../../atoms/CircleButton";

export default function ActionElement({action}: {action: Action}) {
  return (
    <div className={`action action--${action.state}`}
         key={`signal-${action.id}`}
    >
      <p>{action.description}</p>
      <CircleButton size="24px" onClick={() => {}}>🗑</CircleButton>
    </div>
  )
}
