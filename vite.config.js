// ローカル開発サーバ専用。ビルドはしない（本番は GitHub Pages がリポジトリをそのまま配信する）。
import fs from 'node:fs'
import path from 'node:path'

export default {
  // 存在しないパスで index.html を返さず、404 にする
  appType: 'mpa',
  plugins: [
    {
      // GitHub Pages と同じく、/events のようなディレクトリへのアクセスを /events/ にリダイレクトする
      name: 'trailing-slash',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const [pathname, query] = req.url.split('?')
          if (!pathname.endsWith('/') && !path.extname(pathname)) {
            const dir = path.join(server.config.root, decodeURIComponent(pathname))
            if (fs.existsSync(path.join(dir, 'index.html'))) {
              res.statusCode = 301
              res.setHeader('Location', pathname + '/' + (query ? '?' + query : ''))
              return res.end()
            }
          }
          next()
        })
      },
    },
  ],
}
