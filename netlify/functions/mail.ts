import {ServerClient} from 'postmark'
import { HandlerEvent, HandlerContext } from "@netlify/functions";

const client = new ServerClient(process.env.REACT_APP_POSTMARK_TOKEN || '')
const handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.headers.referrer?.includes('ifeel-alert.netlify.app')) {
    const response = await client.sendEmailBatch([
      // {
      //   Subject: 'TEST',
      //   From: 'info@perryjanssen.nl',
      //   To: 'perry@perryjanssen.nl',
      //   HtmlBody: "test",
      //   TextBody: "test",
      // },
      // {
      //   Subject: 'TEST',
      //   From: 'info@perryjanssen.nl',
      //   To: 'psperryjanssen@gmail.com',
      //   HtmlBody: "test",
      //   TextBody: "test",
      // },
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify('Unauthorized')
    }
  }
};

export { handler };
