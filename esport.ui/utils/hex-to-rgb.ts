export const hexToRgb = (hex: string) => {
  let strHex = hex
  if (hex[0] === '#') {
    strHex = hex.substring(1, hex.length)
  }
  var aRgbHex = strHex.match(/.{1,2}/g)
  if (!aRgbHex) {
    return null
  }
  return [parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16)].join(', ')
}
