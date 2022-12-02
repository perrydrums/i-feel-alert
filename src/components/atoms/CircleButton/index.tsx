import React, {ReactNode} from 'react';
import './style.css';
import {Link} from "react-router-dom";

export function ArrowButton({state, direction, hide, onClick}: {state?: string, direction: 'up' | 'down', hide: boolean, onClick?: () => any}) {
  const themeClass = state ? `theme--${state}` : '';
  const hideClass = hide ? 'hide' : '';
  const arrow = direction === 'up' ? '▲' : '▼';

  return (
    <button
      className={`circle-button ${themeClass} ${hideClass}`}
      onClick={onClick}
    >
      {arrow}
    </button>
  );
}

export function LinkCircleButton({state, to, children}: {state?: string, to: string, children: ReactNode}) {
  const themeClass = state ? `theme--dark-${state}` : '';

  return (
    <Link to={to}>
      <button
        className={`circle-button circle-button--icon ${themeClass}`}
      >
        {children}
      </button>
    </Link>
  );
}
