import { fontsList } from '~/data/fonts'

export const getFonts = () => {
  // Set basic test data like the fonts to check,
  const fonts = fontsList
  const baseFonts = ['serif', 'sans-serif', 'monospace']
  const testSize = '72px'
  const testChar = 'A'
  const h = document.getElementById('font')
  const s = document.createElement('span')
  s.style.fontSize = testSize
  s.innerText = testChar
  const defaultFonts = {}

  // get the height and width of the checked letter for all basic fonts
  for (const indexBaseFonts in baseFonts) {
    const baseFont = baseFonts[indexBaseFonts]
    s.style.fontFamily = baseFont

    if (h) {
      h.appendChild(s)
      defaultFonts[baseFont] = {}
      defaultFonts[baseFont].offsetWidth = s.offsetWidth
      defaultFonts[baseFont].offsetHeight = s.offsetHeight
      h.removeChild(s)
    }
  }

  const fontsDetected = []

  for (const indexFont in fonts) {
    const font = fonts[indexFont]
    let detected = false
    const fontStyle = '"' + font + '"'

    // loop trough fontsList to check if the letter has a different size
    // if yes the font is installed on the system
    // if no the system use the fallback font
    for (const _indexBaseFonts in baseFonts) {
      const _baseFont = baseFonts[_indexBaseFonts]
      s.style.fontFamily = fontStyle + ',' + _baseFont

      if (h) {
        h.appendChild(s)
        const match =
          s.offsetWidth !== defaultFonts[_baseFont].offsetWidth ||
          s.offsetHeight !== defaultFonts[_baseFont].offsetHeight
        h.removeChild(s)
        detected = detected || match
      }
    }

    if (detected) {
      fontsDetected.push(font)
    }
  }

  return fontsDetected
}
