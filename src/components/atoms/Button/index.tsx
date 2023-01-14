import React from 'react';
import './style.css';

export default function Button({state, text, pulse = false, onClick}: {state?: string, text: string, pulse?: boolean, onClick?: () => any}) {
  const themeClass = state ? `button--text--${state}` : '';
  const pulseClass = pulse ? 'button--animation' : '';

  return (
    <button
      className={`button ${themeClass} ${pulseClass}`}
      onClick={onClick}
    >
      <span className="button--text">{text}</span>
    </button>
  );
}
