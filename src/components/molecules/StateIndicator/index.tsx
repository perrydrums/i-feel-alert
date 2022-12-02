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
          <ArrowButton direction="up"
                       state={state}
                       hide={state === 'green'}
                       onClick={() => update(states[current + 1] || '')}
          />
          <StateIndicatorCircles state={state}/>
          <ArrowButton direction="down"
                       state={state}
                       hide={state === 'red'}
                       onClick={() => update(states[current - 1] || '')}
          />
        </div>
    );
}
