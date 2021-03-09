import { Node } from './types'
import { filterByComponent } from './filter'
import { camelCase, rgbToHex, toColorObject, toShadow } from './utils'

/**
 * Get tokens
 * @param layer
 * @param artboards
 * @param palette
 * @param decorator
 */
export const getTokens = (
  layer: string,
  artboards: Node[],
  palette: object,
  decorator: Function
) => {
  filterByComponent(layer, artboards).map((element) => decorator(element))
  return palette
}

/**
 * Get colors
 * @param name
 * @param artboards
 */
export const getColors = (name: string, artboards: Node[]) => {
  const palette = { color: {} }
  const decorator = ({ name, children }) => {
    const rgba = toColorObject(children[0].fills[0].color)
    const tokens = {
      [camelCase(name)]: { value: `${rgbToHex(rgba)}` },
    }
    Object.assign(palette.color, tokens)
  }

  return getTokens(name, artboards, palette, decorator)
}

/**
 * Get breakpoints
 * @param name
 * @param artboards
 */
export const getBreakpoints = (name: string, artboards: Node[]) => {
  const palette = { breakpoint: {} }
  const decorator = ({ name, absoluteBoundingBox }) => {
    const tokens = {
      [camelCase(name)]: { value: `${absoluteBoundingBox.width}px` },
    }
    Object.assign(palette.breakpoint, tokens)
  }

  return getTokens(name, artboards, palette, decorator)
}

/**
 * Get radius
 * @param name
 * @param artboards
 */
export const getRadius = (name: string, artboards: Node[]) => {
  const palette = { radius: {} }
  const decorator = ({ name, children }) => {
    const { cornerRadius } = children[0]
    const tokens = {
      [camelCase(name)]: { value: `${cornerRadius}px` },
    }
    Object.assign(palette.radius, tokens)
  }

  return getTokens(name, artboards, palette, decorator)
}

/**
 * Get shadows
 * @param name
 * @param artboards
 */
export const getShadows = (name: string, artboards: Node[]) => {
  const palette = { shadow: {} }
  const decorator = ({ name, effects }) => {
    const { color, offset, radius } = effects[0]
    const tokens = {
      [camelCase(name)]: { value: toShadow(color, offset, radius) },
    }
    Object.assign(palette.shadow, tokens)
  }

  return getTokens(name, artboards, palette, decorator)
}

/**
 * Get spacing
 * @param name
 * @param artboards
 */
export const getSpacing = (name: string, artboards: Node[]) => {
  const palette = { spacing: {} }
  const decorator = ({ name, absoluteBoundingBox }) => {
    const tokens = {
      [camelCase(name)]: { value: `${absoluteBoundingBox.width}px` },
    }
    Object.assign(palette.spacing, tokens)
  }

  return getTokens(name, artboards, palette, decorator)
}

/**
 * Get typography
 * @param name
 * @param artboards
 */
export const getTypography = (name: string, artboards: Node[]) => {
  const palette = { typography: {} }
  const decorator = ({ name, children }) => {
    const { fontFamily, fontSize, lineHeightPx, fontWeight } = children[0].style
    const tokens = {
      [camelCase(name)]: {
        fontFamily: { value: `'${fontFamily}'` },
        fontSize: { value: `${fontSize}px` },
        lineHeight: { value: `${Math.floor(lineHeightPx)}px` },
        fontWeight: { value: fontWeight },
      },
    }
    Object.assign(palette.typography, tokens)
  }

  return getTokens(name, artboards, palette, decorator)
}
