import React from "react";
import "./style.css";

export default function StateIndicatorCircles({ state }: { state: string }) {
  return (
    <div className="state-indicator-circles">
      <div
        className="state-indicator-circle sic--outer"
        style={{ borderColor: `var(--color-border--25)` }}
      >
        <div
          className="state-indicator-circle sic--middle"
          style={{ borderColor: `var(--color-border--50)` }}
        >
          <div
            className="state-indicator-circle sic--inner"
            style={{ borderColor: `var(--color-border)` }}
          >
            <span className="state-indicator-title">{state}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
