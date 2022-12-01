import React from 'react';
import '../style.css';

export default function MiniSubtitle({children, theme = 'default'}: {children: string, theme: string}) {
  const themeClass = `theme--${theme} text--inset`;

  return <h3 className={themeClass}>{children}</h3>;
}
