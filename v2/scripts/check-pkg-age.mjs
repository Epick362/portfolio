#!/usr/bin/env node
// Supply chain safety: abort install if any pinned package was published less than 3 days ago.
// Override with: SKIP_PKG_AGE_CHECK=1 npm install

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

if (process.env.SKIP_PKG_AGE_CHECK === '1') {
  console.log('Package age check skipped.')
  process.exit(0)
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))

const MIN_AGE_MS = 3 * 24 * 60 * 60 * 1000

const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }

const tooNew = []

await Promise.all(
  Object.entries(allDeps).map(async ([name, version]) => {
    if (!version || /^[^0-9]/.test(version)) return

    try {
      const encoded = name.replace('/', '%2F')
      const res = await fetch(`https://registry.npmjs.org/${encoded}/${version}`, {
        signal: AbortSignal.timeout(8000),
      })
      if (!res.ok) return
      const data = await res.json()
      const publishedAt = data.time ?? data._npmPublishTime
      if (!publishedAt) return
      const age = Date.now() - new Date(publishedAt).getTime()
      if (age < MIN_AGE_MS) {
        const daysOld = (age / (24 * 60 * 60 * 1000)).toFixed(1)
        tooNew.push(`  ${name}@${version}  (published ${daysOld}d ago)`)
      }
    } catch {
      // network errors are non-fatal — don't block install
    }
  })
)

if (tooNew.length > 0) {
  console.error('\n⛔  Package age check failed — published less than 3 days ago:')
  tooNew.forEach((l) => console.error(l))
  console.error('\nSet SKIP_PKG_AGE_CHECK=1 to override.\n')
  process.exit(1)
}

console.log('✓ Package age check passed.')
