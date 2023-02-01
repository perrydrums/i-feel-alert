import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Helmet } from "react-helmet-async";

import { useUserContext } from "../../../context/User";
import { supabase } from "../../../helpers/client";
import { getSupporters } from "../../../helpers/get";
import { User } from "../../../helpers/types";
import Button from "../../atoms/Button";
import { CircleButton, LinkCircleButton } from "../../atoms/CircleButton";
import QRCodeOverlay from "../../atoms/QRCodeOverlay";
import Gear from "../../atoms/svg/Gear";
import Text from "../../atoms/text";
import Subtitle from "../../atoms/text/Subtitle";
import Title from "../../atoms/text/Title";
import Toolbar from "../../molecules/Toolbar";
import "../style.css";
import "./style.css";

export default function Supporters() {
  const user = useUserContext();
  const [supporters, setSupporters] = React.useState([] as User[]);
  const [loading, setLoading] = React.useState(true);
  const [shareApiAvailable, setShareApiAvailable] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [showSupport, setShowSupport] = React.useState(false);
  const [showOverlay, setShowOverlay] = React.useState(false);
  const shareLink = user ? `${window.location.origin}/support/${user?.id}` : "";

  React.useEffect(() => {
    if (user) {
      getSupporters(user.id).then((supporters) => {
        setSupporters(supporters);
        setLoading(false);
      });
      setShareApiAvailable(!!navigator.share);
    }
  }, [user]);

  function disconnectSupporter(supporterId: string) {
    supabase
      .from("sharer_supporter")
      .delete()
      .eq("sharer_id", user?.id)
      .eq("supporter_id", supporterId)
      .then(() => {
        setSupporters(supporters.filter((s) => s.id !== supporterId));
      });
  }

  const supportersList = supporters.map((supporter) => (
    <div key={supporter.id} className="supporter-item">
      <div>
        <b>{supporter.name}</b> <br />
        <small>{supporter.email}</small>
      </div>
      <CircleButton
        size="24px"
        onClick={() => disconnectSupporter(supporter.id)}
      >
        🗑
      </CircleButton>
    </div>
  ));

  function shareSupportLink() {
    if (shareApiAvailable && shareLink) {
      navigator.share({
        title: "WebShare API Demo",
        url: shareLink,
      });
    }
  }

  function copySupportLink() {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <>
      <Helmet>
        <body className="black"></body>
      </Helmet>
      <Toolbar
        button={
          <LinkCircleButton to={"/me"}>
            <Gear />
          </LinkCircleButton>
        }
      />
      <div className="page">
        <Title>Supporters</Title>
        <div className="share-link-container">
          <Button
            text="Ask for support"
            onClick={() => setShowSupport(!showSupport)}
          />
          {showSupport && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                marginTop: "-30px",
              }}
            >
              <Button
                text="Show QR code"
                onClick={() => setShowOverlay(true)}
                small={true}
              />
              {shareApiAvailable && (
                <Button
                  text="Share link"
                  onClick={shareSupportLink}
                  small={true}
                />
              )}
            </div>
          )}

          <Text>
            {shareApiAvailable ? "Or send" : "Send"} this link to someone you'd
            like to get support from:
          </Text>
          <CopyToClipboard text={shareLink} onCopy={copySupportLink}>
            <pre className="share-link">{shareLink}</pre>
          </CopyToClipboard>
          {copied ? (
            <span className={`share-link-copied fade-out`}>
              You've copied the link!
            </span>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
        <div>
          <Subtitle>Your supporters</Subtitle>
          {loading ? (
            <div className="supporter-item">Loading...</div>
          ) : (
            supportersList
          )}
          <Text>
            <b>Your supporters are able to:</b>
          </Text>
          <ul>
            <li>View your current state of mind</li>
            <li>Read the signs and actions for your current state</li>
            <li>Get notified when you update your state of mind</li>
          </ul>
        </div>
        {showOverlay && (
          <QRCodeOverlay
            value={shareLink}
            closeFunction={() => setShowOverlay(false)}
          />
        )}
      </div>
    </>
  );
}
