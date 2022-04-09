import { audioFormatsList } from '~/data/audio-formats'

export const getAudioFormats = () => {
  const audioFormats = {}
  try {
    const formatNames = audioFormatsList
    const element = document.createElement('audio')
    formatNames.forEach(function (format) {
      audioFormats[format] =
        !!element.canPlayType && element.canPlayType(format)
    })
  } catch (e) {
    return null
  }

  return audioFormats
}

export const getAudioContext = () => {
  const audioContext = {}

  try {
    const ac = new window.AudioContext()
    audioContext.channelCount = ac.destination.channelCount
    audioContext.channelCountMode = ac.destination.channelCountMode
    audioContext.channelInterpretation = ac.destination.channelInterpretation
    audioContext.maxChannelCount = ac.destination.maxChannelCount
    audioContext.numberOfInputs = ac.destination.numberOfInputs
    audioContext.numberOfOutputs = ac.destination.numberOfOutputs
    audioContext.sampleRate = ac.sampleRate
    audioContext.state = ac.state
  } catch (e) {
    return null
  }
  return audioContext
}

export const getAnalyserNode = () => {
  const analyserNode = {}

  try {
    const ac = new window.AudioContext()
    const an = ac.createAnalyser()
    analyserNode.channelCount = an.channelCount
    analyserNode.channelCountMode = an.channelCountMode
    analyserNode.channelInterpretation = an.channelInterpretation
    analyserNode.fftSize = an.fftSize
    analyserNode.frequencyBinCount = an.frequencyBinCount
    analyserNode.maxDecibels = an.maxDecibels
    analyserNode.minDecibels = an.minDecibels
    analyserNode.numberOfInputs = an.numberOfInputs
    analyserNode.numberOfOutputs = an.numberOfOutputs
    analyserNode.smoothingTimeConstant = an.smoothingTimeConstant
  } catch (e) {
    return null
  }

  return analyserNode
}
