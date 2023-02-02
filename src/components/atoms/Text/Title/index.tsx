import React from "react";

export default function Title({
  children,
  theme = "default",
}: {
  children: string;
  theme?: string;
}) {
  const themeClass = `theme--${theme}`;

  return <h1 className={themeClass}>{children}</h1>;
}
