import { FluffyChild, Node } from './types'

/**
 * @description
 * Filter artboards returning only tokens
 *
 * @export
 * @param {string} name
 * @param {Node[]} artboards
 * @returns {FluffyChild[]}
 */
export function filterByToken(name: string, artboards: Node[]): FluffyChild[] {
  const layer = artboards.find((node) => node.name === name)
  return layer ? layer.children : []
}

/**
 * @description
 * Filter artboards returning only components
 *
 * @export
 * @param {string} layer
 * @param {Node[]} artboards
 * @returns {FluffyChild[]}
 */
export function filterByComponent(
  layer: string,
  artboards: Node[]
): FluffyChild[] {
  const type = 'COMPONENT'
  return filterByToken(layer, artboards).filter((item) => item.type === type)
}
