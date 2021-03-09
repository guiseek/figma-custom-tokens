import { FigmaResponse, Node } from "../utils/types";

export interface Context {
  response: FigmaResponse
  nodes: Node[]
  dist: string
}

export const context: Context = {
  dist: 'dist/tokens',
  response: null,
  nodes: [],
}