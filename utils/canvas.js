export const getCanvasImage = () => {
  let canvasData
  try {
    const canvas = document.createElement('canvas')
    canvas.height = 60
    canvas.width = 400
    const canvasContext = canvas.getContext('2d')
    canvas.style.display = 'inline'
    canvasContext.textBaseline = 'alphabetic'
    canvasContext.fillStyle = '#f60'
    canvasContext.fillRect(125, 1, 62, 20)
    canvasContext.fillStyle = '#069'
    canvasContext.font = '11pt fake-font-123'
    canvasContext.fillText(
      'Cwm fjordbank glyphs vext quiz, \uD83D\uDE03',
      2,
      15
    )
    canvasContext.fillStyle = 'rgba(102, 204, 0, 0.7)'
    canvasContext.font = '18pt Arial'
    canvasContext.fillText(
      'Cwm fjordbank glyphs vext quiz, \uD83D\uDE03',
      4,
      45
    )
    canvasData = canvas.toDataURL()

    return canvasData
  } catch (e) {
    return null
  }
}
