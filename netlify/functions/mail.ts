import { HandlerContext, HandlerEvent } from "@netlify/functions";
import { ServerClient } from "postmark";

import { User } from "../../src/helpers/types";

const client = new ServerClient(process.env.REACT_APP_POSTMARK_TOKEN || "");
const handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.headers.referer?.includes("ifeel-alert.netlify.app")) {
    const supporters: [User] = JSON.parse(event.body || "").supporters;
    const sharer: User = JSON.parse(event.body || "").sharer;
    const state: string = JSON.parse(event.body || "").state;

    if (supporters && sharer && state) {
      const actions = supporters.map((supporter) => {
        return {
          To: supporter.email,
          From: "info@perryjanssen.nl",
          TemplateAlias: `mood-${state}`,
          TemplateModel: {
            supporterName: supporter.name,
            sharerName: sharer.name,
            company_name: "ifeel/ALERT",
            product_name: "ifeel/ALERT",
          },
        };
      });

      const response = await client.sendEmailBatchWithTemplates(actions);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    } else {
      return {
        statusCode: 400,
        body: "No emailAddresses provided",
      };
    }
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify("Unauthorized"),
    };
  }
};

export { handler };
