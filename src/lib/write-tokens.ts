import { existsSync, mkdirSync, writeFileSync } from 'fs'

export const writeTokens = (name: string, tokens: object, dir = '') => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  writeFileSync(`${dir}/${name}.json`, JSON.stringify(tokens, null, 2))
}
