export function sendMessage(recipient: string, text: string) {
  if (process.env.REACT_APP_WHATSAPP_ENABLED === "0") {
    return null;
  }
  const body = JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: {
      body: text,
    },
  });

  const config = {
    method: "post",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body,
  };

  return fetch(
    `https://graph.facebook.com/${process.env.REACT_APP_VERSION}/${process.env.REACT_APP_PHONE_NUMBER_ID}/messages`,
    config
  );
}
