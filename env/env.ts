import dotenv from 'dotenv'

dotenv.config()

export const env = {
  figmaToken: process.env.FIGMA_TOKEN,
  figmaFile: process.env.FIGMA_FILE,
}
