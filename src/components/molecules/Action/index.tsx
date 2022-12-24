import React from 'react';
import {Action} from "../../../helpers/types";
import './style.css';
import {CircleButton} from "../../atoms/CircleButton";

export default function ActionElement({action, border}: {action: Action, border?: boolean}) {
  return (
    <div className={`action ${border && `action--${action.state}`}`}
         key={`action-${action.id}`}
    >
      <p>{action.description}</p>
      <CircleButton size="24px" onClick={() => {}}>🗑</CircleButton>
    </div>
  )
}
