# Extension messages


## Start timer

``` ts
nodecg.sendMessageToBundle('nodecg-timekeeper', 'start')
  .then(() => {
    // Nothing data to deliver to callback.
  })
  .catch((error: Error) => {
    console.error(error);
  });
```

## Finish timer

``` ts
nodecg.sendMessageToBundle('nodecg-timekeeper', 'finish')
  .then((time: Time) => {
    // Deliver finished time data.
    console.log(time.display);
  })
  .catch((error: Error) => {
    console.error(error);
  });
```

## Pause Timer

``` ts
nodecg.sendMessageToBundle('nodecg-timekeeper', 'pause')
  .then((time: Time) => {
    // Deliver paused time data.
    console.log(time.display);
  })
  .catch((error: Error) => {
    console.error(error);
  });
```

## Resume timer

``` ts
nodecg.sendMessageToBundle('nodecg-timekeeper', 'resume')
  .then((time: Time) => {
    // Nothing data to deliver to callback.
  })
  .catch((error: Error) => {
    console.error(error);
  });
```

## Reset time histories

``` ts
nodecg.sendMessageToBundle('nodecg-timekeeper', 'reset-history')
  .then(() => {
    // Nothing data to deliver to callback.
  })
  .catch((error: Error) => {
    console.error(error);
  });
```