import React from "react";

import "./style.css";

export default function Text({ children }: { children: React.ReactNode }) {
  return <p children={children} />;
}
