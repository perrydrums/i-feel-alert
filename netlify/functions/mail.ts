import {ServerClient} from 'postmark'
import { HandlerEvent, HandlerContext } from "@netlify/functions";

const client = new ServerClient(process.env.REACT_APP_POSTMARK_TOKEN || '')
const handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.headers.referrer?.includes('ifeel-alert.netlify.app')) {
    const emailAddresses = JSON.parse(event.body || '').emailAddresses;
    const user = JSON.parse(event.body || '').user;
    if (emailAddresses && user) {
      const actions = emailAddresses.map((emailAddress: string) => {
        return {
          To: emailAddress,
          Subject: `iFeel Alert: ${user.name} needs your support`,
          From: 'info@perryjanssen.nl',
          HtmlBody: `Hi, ${user.name} needs your support. Please visit https://ifeel-alert.netlify.app/ to see what you can do.`,
          TextBody: `Hi, ${user.name} needs your support. Please visit https://ifeel-alert.netlify.app/ to see what you can do.`,
        };
      });

      const response = await client.sendEmailBatch(actions);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    } else {
      return {
        statusCode: 400,
        body: 'No emailAddresses provided',
      };
    }
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify('Unauthorized')
    }
  }
};

export { handler };
