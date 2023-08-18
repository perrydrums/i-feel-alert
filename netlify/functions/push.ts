import { Handler } from "@netlify/functions";
import * as OneSignal from "@onesignal/node-onesignal";

export const handler: Handler = async (event, context) => {
  const receivers = JSON.parse(event.body || "").receivers;

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
  // notification.include_external_user_ids = receivers;
  notification.include_external_user_ids = [
    "f70e1753-b0d1-48e7-a9f8-b7e8b4835a60",
  ];
  notification.headings = {
    en: "ALERT!",
  };
  notification.contents = {
    en: "LALALALLALA",
  };

  const { id, external_id, errors } = await client.createNotification(
    notification
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello!`,
    }),
  };
};
