import { Handler } from "@netlify/functions";
import * as OneSignal from "@onesignal/node-onesignal";

export const handler: Handler = async (event, context) => {
  const configuration = OneSignal.createConfiguration({
    appKey: "MDk2ODU2YjUtNTlhYy00NTY5LWIwOWMtNDJlMjllYTMyOGQz",
  });

  const client = new OneSignal.DefaultApi(configuration);

  const app = await client.getApp("57507296-ef2e-4355-990a-9f0b84790626");

  const notification = new OneSignal.Notification();

  notification.app_id = app.id as string;

  notification.name = "test_notification_name";
  notification.contents = {
    en: "Gig'em Ags",
  };

  // required for Huawei
  notification.headings = {
    en: "Gig'em Ags",
  };
  await client.createNotification(notification);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello!`,
    }),
  };
};
