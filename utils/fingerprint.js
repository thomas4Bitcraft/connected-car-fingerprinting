import {
  getAudioFormats,
  getAudioContext,
  getAnalyserNode,
} from '~/utils/audio'
import { getCanvasImage } from '~/utils/canvas'
import { getFonts } from '~/utils/fonts'
import { getScreen } from '~/utils/screen'
import {
  getSessionStorageEnabled,
  getLocaleStorageEnabled,
} from '~/utils/storage'
import { getNavigatorData } from '~/utils/navigator'
import { getVideoData } from '~/utils/video'
import { getPlugins } from '~/utils/plugins'
import { getWebGLData } from '~/utils/webgl'
import { generateMurmurHash } from '~/utils/hash'

export default ({ httpData, debug = false } = {}) => {
  // Audio Data
  const audioFormats = getAudioFormats()
  const audioContext = getAudioContext()
  const analyserNode = getAnalyserNode()

  // Canvas
  const canvasImage = getCanvasImage()

  // WebGL
  const webGL = getWebGLData()

  // Fonts
  const fontsList = getFonts()

  // Screen
  const screen = getScreen()

  // Storage
  const sessionStorageEnabled = getSessionStorageEnabled()
  const localeStorageEnabled = getLocaleStorageEnabled()

  // Navigator
  const navigator = getNavigatorData()

  // Plugins
  const plugins = getPlugins()

  // Video
  const videoFormats = getVideoData()

  const data = {
    httpData,
    audioFormats,
    audioContext,
    analyserNode,
    screen,
    sessionStorageEnabled,
    localeStorageEnabled,
    navigator,
    videoFormats,
    webGL,
    canvasImage,
    fontsList,
    plugins,
  }

  const encodedData = JSON.stringify(data, null, 4)
  const fingerprint = generateMurmurHash(encodedData)

  if (debug) {
    console.log(`Fingerprint: ${fingerprint}`)
    console.log(`Fingerprint data: ${encodedData}`)
  }

  return {
    data,
    fingerprint,
  }
}
