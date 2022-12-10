import React from 'react';
import '../style.css';

export default function Subtitle({children, theme = 'default'}: {children: string, theme?: string}) {
  const themeClass = `theme--${theme} text--inset`;

  return <h2 className={themeClass}>{children}</h2>;
}
