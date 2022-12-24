import React from 'react';
import {Advice} from "../../../helpers/types";
import './style.css';
import {CircleButton} from "../../atoms/CircleButton";

export default function AdviceItem({advice, editable}: {advice: Advice, editable?: boolean}) {
  return (
    <div className={`advice ${editable && `advice--${advice.state}`}`}
         key={`advice-${advice.id}`}
    >
      <p>{advice.description}</p>
      {editable && <CircleButton size="24px" onClick={() => {}}>🗑</CircleButton>}
    </div>
  )
}
