import React from 'react';
import './style.css';

export default function ArrowButton({state, direction, onClick}: {state?: string, direction: 'up' | 'down', onClick?: () => any}) {
  const themeClass = state ? `theme--${state}` : '';
  const arrow = direction === 'up' ? '▲' : '▼';

  return (
    <button
      className={'arrow-button ' + themeClass}
      onClick={onClick}
    >
      {arrow}
    </button>
  );
}
