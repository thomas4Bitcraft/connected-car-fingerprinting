import {
  getAudioFormats,
  getAudioContext,
  getAnalyserNode,
} from '~/utils/audio'
import { getConnection } from '~/utils/connection'
import { getCanvasImage } from '~/utils/canvas'
import { getFonts } from '~/utils/fonts'
import { getMultimedia } from '~/utils/multimedia'
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

export default async ({ httpData, debug = false } = {}) => {
  // Audio Data
  const audioFormats = getAudioFormats()
  const audioContext = getAudioContext()
  const analyserNode = getAnalyserNode()

  // Connection
  const connection = getConnection()

  // Canvas
  const canvasImage = getCanvasImage()

  // Canvas
  const webGL = getWebGLData()

  // Fonts
  const fontsList = getFonts()

  // Multimedia
  const multimedia = await getMultimedia()

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
    connection,
    multimedia,
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
    fingerprint,
    data,
  }
}
