# www.rowinbot.com

- [React Router Docs](https://reactrouter.com/)

## Fly Setup

1. [Install `flyctl`](https://fly.io/docs/getting-started/installing-flyctl/)

2. Sign up and log in to Fly

```sh
flyctl auth signup
```

3. Setup Fly. It might ask if you want to deploy, say no since you haven't built the app yet.

```sh
flyctl launch
```

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

If you've followed the setup instructions already, all you need to do is run this:

```sh
npm run deploy
```

You can run `flyctl info` to get the url and ip address of your server.

Check out the [fly docs](https://fly.io/docs/getting-started/node/) for more information.

## Upgrading

Note, when upgrading the React version, make sure to clean up the `/content/build` folder and running `npm run content:watch` again to rebuild the content. This is because the content build process uses the React version to render the MDX files.

```sh
rm -rf content/build
npm run content:watch
```

## License

- **Code** — MIT. See [`LICENSE`](./LICENSE).
- **Brand assets** — the Rowinbot mark, logos, icons, favicons and related artwork in [`brand/`](./brand) (and the branded images they produce under `public/`, e.g. the favicon and Open Graph images) are **creative work, All Rights Reserved**. They are **not** covered by the MIT license — see [`brand/LICENSE`](./brand/LICENSE). They live here only so the official rowinbot.com site can render its own branding.
