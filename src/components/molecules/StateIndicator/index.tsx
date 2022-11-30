import React from 'react';
import StateIndicatorCircles from "../../atoms/StateIndicatorCircles";

export default function StateIndicator({state}: {state: string}) {
  return <StateIndicatorCircles state={state}/>;
}
