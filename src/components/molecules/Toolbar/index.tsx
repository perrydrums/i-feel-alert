import React from 'react';
import './style.css';
import {LinkCircleButton} from "../../atoms/CircleButton";

export default function Toolbar({name, state = 'default'}: { name: string, state?: string }) {
  const themeClass = state ? `bg--dark-${state}` : '';
  return (
    <div className={`toolbar ${themeClass}`}>
      <span className="toolbar--name">Welcome, {name}</span>
      <div className="toolbar--button">
        <LinkCircleButton state={state} to="/me/signs">⚙</LinkCircleButton>
      </div>
    </div>
  );
}
