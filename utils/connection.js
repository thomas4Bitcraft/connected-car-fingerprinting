export const getConnection = () => {
  try {
    const connection = navigator.connection
    return {
      effectiveType: connection.effectiveType,
      rtt: connection.rtt,
      saveData: connection.saveData,
      type: connection.type,
    }
  } catch (e) {
    return null
  }
}
