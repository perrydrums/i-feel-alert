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
    "fc262e69-c8a5-401f-b4c6-31fd961e42b8",
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
