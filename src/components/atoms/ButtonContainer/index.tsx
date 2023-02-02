import React from "react";

import "./style.css";

export default function ButtonContainer({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="button-container" style={style}>
      {children}
    </div>
  );
}
