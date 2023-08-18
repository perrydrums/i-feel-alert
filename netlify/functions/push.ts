import { Handler } from "@netlify/functions";
import * as OneSignal from "@onesignal/node-onesignal";

import { User } from "../../src/helpers/types";

export const handler: Handler = async (event, context) => {
  const supporters: [User] = JSON.parse(event.body || "").supporters;
  const sharer: User = JSON.parse(event.body || "").sharer;
  const state: string = JSON.parse(event.body || "").state;

  const app_key_provider = {
    getToken() {
      return "MDk2ODU2YjUtNTlhYy00NTY5LWIwOWMtNDJlMjllYTMyOGQz";
    },
  };

  const configuration = OneSignal.createConfiguration({
    authMethods: {
      app_key: {
        tokenProvider: app_key_provider,
      },
    },
  });

  const client = new OneSignal.DefaultApi(configuration);

  const appId = "57507296-ef2e-4355-990a-9f0b84790626";

  const notification = new OneSignal.Notification();

  notification.app_id = appId;
  notification.include_external_user_ids = supporters.map(
    (supporter) => supporter.id
  );
  notification.headings = {
    en: `${sharer.name}'s mood decreased`,
  };
  notification.contents = {
    en: `${sharer.name} is feeling ${state} right now. You might want to check in with them.`,
  };

  const { id, external_id, errors } = await client.createNotification(
    notification
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      id,
      external_id,
      errors,
    }),
  };
};
