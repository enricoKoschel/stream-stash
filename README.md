# Stream Stash

Companion for streaming movies, TV shows and anime. This repository represents the frontend of the app, the backend can
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

### Request API access to [The Movie Database](https://www.themoviedb.org)

Click [here](https://developer.themoviedb.org/docs/getting-started) for instructions on how to request access

### Provide Stream Stash with your API access

1. Create a `.env` file in the root directory of the project
2. Add the following line to the `.env` file\
   `TMDB_ACCESS_TOKEN='<YOUR_API_ACCESS_TOKEN>'`
3. Make sure to replace `<YOUR_API_ACCESS_TOKEN>` with your API read access token, not with your API key
4. Both can be found [here](https://www.themoviedb.org/settings/api) after your request for API access has been granted

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
