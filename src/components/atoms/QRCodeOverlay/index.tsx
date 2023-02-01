import React from "react";
import QRCode from "react-qr-code";

import Text from "../../atoms/text";
import "./style.css";

export default function QRCodeOverlay({
  value,
  closeFunction,
}: {
  value: string;
  closeFunction: () => void;
}) {
  return (
    <div className="qr-code-overlay" onClick={closeFunction}>
      <QRCode value={value} className="qr-code" />
      <Text>click anywhere to close</Text>
    </div>
  );
}
