import React from 'react';
import './style.css';

export default function ArrowButton({state, direction, hide, onClick}: {state?: string, direction: 'up' | 'down', hide: boolean, onClick?: () => any}) {
  const themeClass = state ? `theme--${state}` : '';
  const hideClass = hide ? 'hide' : '';
  const arrow = direction === 'up' ? '▲' : '▼';

  return (
    <button
      className={`arrow-button ${themeClass} ${hideClass}`}
      onClick={onClick}
    >
      {arrow}
    </button>
  );
}
