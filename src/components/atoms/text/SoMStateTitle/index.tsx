import React from 'react';
import './style.css';

export default function SoMStateTitle({theme}: {theme: string}) {
  const themeClass = `theme--${theme}`;
  return <span className={'state-color-title ' + themeClass}>{theme}</span>;
}
