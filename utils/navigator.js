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
    count: Object.keys(window.navigator),
  }
}
