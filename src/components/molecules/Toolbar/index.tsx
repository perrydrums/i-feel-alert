import React, {ReactNode} from 'react';
import './style.css';

export default function Toolbar({title, button = null, state = 'default'}: { title: string, button?: ReactNode, state?: string }) {
  const themeClass = state ? `bg--dark-${state}` : '';
  return (
    <div className={`toolbar ${themeClass}`}>
      <p className="toolbar--name">{title}</p>
      <div className="toolbar--button">
        {button || ''}
      </div>
    </div>
  );
}
