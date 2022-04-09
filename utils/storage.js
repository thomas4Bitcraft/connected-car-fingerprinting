export const getLocaleStorageEnabled = () => {
  try {
    localStorage.fp = 'test'
  } catch (ex) {}

  try {
    if (localStorage.fp === 'test') {
      return true
    }
  } catch (e) {}
  return false
}

export const getSessionStorageEnabled = () => {
  try {
    sessionStorage.fp = 'test'
  } catch (ex) {}

  try {
    if (sessionStorage.fp === 'test') {
      return true
    }
  } catch (e) {}

  return false
}

export const getStorageUsage = async () => {
  let storageUsage = null
  let storageQuota = null

  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const res = await navigator.storage.estimate()
    storageUsage = res.usage
    storageQuota = res.quota
  }

  return {
    storageUsage,
    storageQuota,
  }
}
