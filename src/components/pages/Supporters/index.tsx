import React from 'react';
import './style.css';
import '../style.css';
import Toolbar from "../../molecules/Toolbar";
import Title from "../../atoms/text/Title";
import {CircleButton, LinkCircleButton} from "../../atoms/CircleButton";
import {getSupporters} from "../../../helpers/get";
import {User} from "../../../helpers/types";
import {getCurrentUser} from "../../../helpers/auth";
import Button from "../../atoms/Button";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Subtitle from "../../atoms/text/Subtitle";
import Text from "../../atoms/text";
import {supabase} from "../../../helpers/client";

export default function Supporters() {
  const [user, setUser] = React.useState<User | null>(null);
  const [supporters, setSupporters] = React.useState([] as User[]);
  const [loading, setLoading] = React.useState(true);
  const [shareApiAvailable, setShareApiAvailable] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const shareLink = user ? `${window.location.origin}/support/${user?.id}` : '';

  React.useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        getSupporters(user.id).then((supporters) => {
          setSupporters(supporters);
          setLoading(false);
        });
        setUser(user);
        setShareApiAvailable(!!navigator.share);
      }
    });
  }, []);

  function disconnectSupporter(supporterId: string) {
    supabase
      .from('sharer_supporter')
      .delete()
      .eq('sharer_id', user?.id)
      .eq('supporter_id', supporterId)
      .then(() => {
        setSupporters(supporters.filter(s => s.id !== supporterId));
      });
  }

  const supportersList = supporters.map((supporter) =>
    <div key={supporter.id} className="supporter-item">
      <div>
        <b>{supporter.name}</b> <br/>
        <small>{supporter.email}</small>
      </div>
      <CircleButton onClick={() => disconnectSupporter(supporter.id)}>🗑</CircleButton>
    </div>
  );

  function shareSupportLink() {
    if (shareApiAvailable && shareLink) {
      navigator.share({
        title: 'WebShare API Demo',
        url: shareLink
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
      <Toolbar button={<LinkCircleButton to={'/me'}>⚙</LinkCircleButton>}/>
      <div className="page">
        <Title>Supporters</Title>
        {shareApiAvailable
          ? <div className="share-link-container">
              <p>Share your support link:</p>
              <Button text="Ask for support" onClick={shareSupportLink} />
            </div>
          : <>
              <div className="share-link-container">
                <Text>Send this link to someone you'd like to get support from:</Text>
                <CopyToClipboard text={shareLink} onCopy={copySupportLink}>
                  <pre className="share-link">{shareLink}</pre>
                </CopyToClipboard>
                {copied
                  ? <span className={`share-link-copied fade-out`}>You've copied the link!</span>
                  : <span>&nbsp;</span>
                }
              </div>
            </>
        }
        <div>
          <Subtitle>Your supporters</Subtitle>
          {loading
            ? <div className="supporter-item">Loading...</div>
            : supportersList
          }
          <Text><b>Your supporters are able to:</b></Text>
          <ul>
            <li>View your current state of mind</li>
            <li>Read the signs and actions for your current state</li>
            <li>Get notified when you update your state of mind</li>
          </ul>
        </div>
      </div>
    </>
  );
}
