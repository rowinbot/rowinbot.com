const path = require('node:path')
const chokidar = require('chokidar')

const contentDir = path.join(__dirname, 'content')

const watcher = chokidar.watch([contentDir], {
  ignored: /(^|[/\\])\../, // ignore dotfiles
  persistent: true,
})

const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://rowinbot.com'
const refreshCacheUrl = new URL(
  '/resources/refresh-cache',
  serverUrl
).toString()

const commandToken = process.env.INTERNAL_COMMAND_TOKEN

if (!commandToken) {
  throw new Error('INTERNAL_COMMAND_TOKEN is required')
}

watcher.on('change', async (path) => {
  if (path.startsWith(contentDir)) {
    try {
      console.log('Refreshing cache')
      const response = await fetch(refreshCacheUrl, {
        headers: {
          auth: commandToken,
        },
        body: JSON.stringify({
          contentPaths: [
            path.substring(contentDir.length + 1).replace(/\.md$/, ''),
          ],
        }),
        method: 'POST',
      })

      console.log('Cache refresh response:', response.status)
    } catch (e) {
      console.error(e)
    }
  }
})
