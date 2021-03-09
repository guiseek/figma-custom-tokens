import { RGB, RGBA } from './types'

export const getColor = (color: number) => Math.round(color * 255)

export const fromColorObject = (
  r: number,
  g: number,
  b: number,
  a?: number
) => {
  const colors = [getColor(r), getColor(g), getColor(b)]
  return a ? `rgba(${colors}, ${a})` : `rgb(${colors})`
}

export const toColorObject = ({ r, g, b, a }: RGBA) => {
  return { r: getColor(r), g: getColor(g), b: getColor(b), a }
}

export const colorToHex = (rgb: number) => {
  const hex = (+rgb).toString(16)
  return hex.length < 2 ? `0${hex}` : hex
}

export const rgbToHex = ({ r, g, b }: RGB) => {
  return `#${colorToHex(r) + colorToHex(g) + colorToHex(b)}`
}

export const toRGBA = ({ r, g, b, a }: RGBA) => {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export const camelCase = (str: string) => {
  const match = (str: string) => str.charAt(str.length - 1).toUpperCase()

  const strUpdate = str.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, match)

  return strUpdate.charAt(0).toLowerCase() + strUpdate.substring(1)
}

export const coerceTrim = (str: string) => str.replace(/^\s+|\s+$/gm, '')

export const toShadow = (color: RGBA, { x, y }, radius: number) => {
  return `${x}px ${y}px ${radius}px ${toRGBA(color)}`
}
