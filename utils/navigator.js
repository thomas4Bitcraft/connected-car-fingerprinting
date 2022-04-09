export const getNavigatorData = () => {
  const {
    appName,
    appCodeName,
    appVersion,
    cookieEnabled,
    deviceMemory,
    doNotTrack,
    hardwareConcurrency,
    platform,
    product,
    productSub,
    userAgent,
    vendor,
    vendorSub,
    webdriver,
    buildID,
  } = window.navigator

  let count = 0
  // eslint-disable-next-line no-unused-vars
  for (const i in navigator) {
    count++
  }

  return {
    appName,
    appCodeName,
    appVersion,
    cookieEnabled,
    deviceMemory,
    doNotTrack,
    hardwareConcurrency,
    platform,
    product,
    productSub,
    userAgentJS: userAgent,
    vendor,
    vendorSub,
    webdriver,
    buildID,
    count,
  }
}
