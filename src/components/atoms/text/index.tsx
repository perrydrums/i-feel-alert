import React from 'react';
import './style.css';

export default function Text({children, theme = 'default'}: {children: string, theme: string}) {
  const themeClass = `theme--${theme}`;

  return <p className={themeClass}>{children}</p>;
}
