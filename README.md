# Real time profit dashboard

Opens a socket connection with MetaApi.

Every closed position will be fetched from the MetaApi socket and save into the local data store.

## Start up

```
node index.js
```

Runs on http://localhost:3000/

## Manual add profit

```
node prompt/profit.js
> answer in the questions
> done
```

![screenshot](./assets/image/screenshot.png)
