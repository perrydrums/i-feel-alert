import React, {ReactNode} from 'react';
import './style.css';

export default function Toolbar({title, button = null, state = 'default'}: { title: string, button?: ReactNode, state?: string }) {
  const themeClass = state ? `bg--dark-${state}` : '';
  return (
    <div className={`toolbar ${themeClass}`}>
      <span className="toolbar--name">{title}</span>
      <div className="toolbar--button">
        {button || ''}
      </div>
    </div>
  );
}
