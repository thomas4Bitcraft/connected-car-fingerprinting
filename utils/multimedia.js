export const getMultimedia = () => {
  return new Promise(function (resolve) {
    const deviceToCount = {
      audiooutput: 0,
      audioinput: 0,
      videoinput: 0,
    }

    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.enumerateDevices &&
      navigator.mediaDevices.enumerateDevices.name !== 'bound reportBlock'
    ) {
      navigator.mediaDevices.enumerateDevices().then(function (devices) {
        if (typeof devices !== 'undefined') {
          let name

          for (let i = 0; i < devices.length; i++) {
            name = [devices[i].kind]
            deviceToCount[name] = deviceToCount[name] + 1
          }

          resolve({
            speakers: deviceToCount.audiooutput,
            micros: deviceToCount.audioinput,
            webcams: deviceToCount.videoinput,
          })
          // 1571937013393b99891d64a2519c5ad6
        } else {
          resolve({
            speakers: 0,
            micros: 0,
            webcams: 0,
          })
        }
      })
    } else {
      resolve({
        speakers: 0,
        micros: 0,
        webcams: 0,
      })
    }
  })
}
