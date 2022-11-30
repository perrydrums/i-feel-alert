import React from 'react';
import StateIndicatorCircles from "../../atoms/StateIndicatorCircles";
import ArrowButton from "../../atoms/ArrowButton";

export default function StateIndicator({state, update = null}: {state: string, update?: ((state: string) => void) | null}) {
  const states = ['red', 'yellow', 'green'];
  const current = states.findIndex((s) => s === state);

  return update === null
    ? <StateIndicatorCircles state={state}/>
    : (
        <div className="state-indicator">
          {state !== 'green' && <ArrowButton direction="up"
                                             state={state}
                                             onClick={() => update(states[current + 1] || '')}
          /> }
          <StateIndicatorCircles state={state}/>
          {state !== 'red' && <ArrowButton direction="down"
                                           state={state}
                                           onClick={() => update(states[current - 1] || '')}
          /> }
        </div>
    );
}
