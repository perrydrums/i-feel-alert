import React from 'react';
import './style.css';

export default function Button({state, text, onClick}: {state?: string, text: string, onClick?: () => any}) {
  const themeClass = state ? `button--text--${state}` : '';

  return (
    <button
      className={'button ' + themeClass}
      onClick={onClick}
    >
      <span className="button--text">{text}</span>
    </button>
  );
}
