# Stream Stash

Companion for streaming movies, TV shows and anime. This repository includes the frontend of the app, the backend can
be found [here](https://github.com/enricoKoschel/stream_stash_backend).

## How to run locally

Run all the following commands in the root directory of the project

### Install the Quasar CLI

```bash
yarn global add @quasar/cli
```

### Install the dependencies

```bash
yarn
```

### Download and run the Stream Stash backend

Click [here](https://github.com/enricoKoschel/stream_stash_backend) for instructions on how to do so

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
```

### Format the files

```bash
yarn format
```

## Deploy the app

### Build the app for production

```bash
quasar build
```

### Run local webserver with the build output

```bash
quasar serve ./dist/spa --history
```
