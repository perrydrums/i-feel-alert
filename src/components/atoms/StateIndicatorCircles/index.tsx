import React from "react";

import "./style.css";

export default function StateIndicatorCircles({ state }: { state: string }) {
  return (
    <div className="state-indicator-circles">
      <div className="state-indicator-circle sic--outer">
        <div className="state-indicator-circle sic--middle">
          <div className="state-indicator-circle sic--inner">
            <span className="state-indicator-title">{state}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
