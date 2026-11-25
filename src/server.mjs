import { createServer } from 'http'
import { readFile, stat } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.resolve(__dirname, '../dist')
const port = Number(process.env.PORT) || 3000

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

async function isFile(p) {
  try {
    return (await stat(p)).isFile()
  } catch {
    return false
  }
}

createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
    let filePath = path.join(dist, urlPath === '/' ? 'index.html' : urlPath)

    if (!filePath.startsWith(dist)) {
      res.writeHead(403).end('Forbidden')
      return
    }

    if (!(await isFile(filePath))) {
      filePath = path.join(dist, 'index.html')
    }

    const data = await readFile(filePath)
    const ext = path.extname(filePath)
    res.writeHead(200, {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
    })
    res.end(data)
  } catch {
    res.writeHead(500).end('Build missing. Run npm run build.')
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`DAYBLOOM listening on ${port}`)
})
