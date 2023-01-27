import React from "react";

import { Advice } from "../../../helpers/types";
import { CircleButton } from "../../atoms/CircleButton";
import "./style.css";

export default function AdviceItem({
  advice,
  deleteFunction,
}: {
  advice: Advice;
  deleteFunction?: () => void;
}) {
  return (
    <div
      className={`advice ${deleteFunction ? `advice--${advice.state}` : ""}`}
      key={`advice-${advice.id}`}
    >
      <p>{advice.description}</p>
      {deleteFunction && (
        <CircleButton size="24px" onClick={deleteFunction}>
          🗑
        </CircleButton>
      )}
    </div>
  );
}
