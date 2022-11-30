import React from 'react';

export default function Subtitle({children, theme = 'default'}: {children: string, theme: string}) {
  const themeClass = `theme--${theme}`;

  return <h2 className={themeClass}>{children}</h2>;
}
