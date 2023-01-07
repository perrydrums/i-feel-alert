PushManager.subscribe().then(function(subscription) {
  // The subscription was successful
  console.log('endpoint:', subscription.endpoint);
  console.log('keys:', subscription.keys);
});
