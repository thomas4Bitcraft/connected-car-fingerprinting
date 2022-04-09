import { videoFormatsList } from '~/data/video-formats'

export const getVideoData = () => {
  try {
    const formatNames = videoFormatsList
    const videoFormats = []
    const element = document.createElement('video')
    formatNames.forEach(function (format) {
      if (!!element.canPlayType && element.canPlayType(format)) {
        videoFormats.push(format)
      }
      videoFormats[format] =
        !!element.canPlayType && element.canPlayType(format)
    })

    return videoFormats
  } catch (e) {
    return []
  }
}
