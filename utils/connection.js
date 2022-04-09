export const getConnection = () => {
  try {
    const connection = navigator.connection
    return {
      downlink: connection.downlink,
      downlinkMax: connection.downlinkMax,
      effectiveType: connection.effectiveType,
      rtt: connection.rtt,
      saveData: connection.saveData,
      type: connection.type,
    }
  } catch (e) {
    return null
  }
}
