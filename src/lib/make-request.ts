import fetch from 'node-fetch'
import { FigmaResponse } from './utils/types'

export const makeRequest = async (id: string, token: string) => {
  try {
    return fetch(`https://api.figma.com/v1/files/${id}`, {
      headers: { 'X-Figma-Token': token },
    }).then((data) => data.json()) as Promise<FigmaResponse>
  } catch (err) {
    console.error(err)
  }
}
