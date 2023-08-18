function registerServiceWorker() {
  return navigator.serviceWorker.register("/sw.js");
}

async function askUserPermission() {
  return await Notification.requestPermission();
}

async function createNotificationSubscription() {
  //wait for service worker installation to be ready
  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey,
  });
}
