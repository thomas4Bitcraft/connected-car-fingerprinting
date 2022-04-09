export const getPlugins = () => {
  const plugins = Object.entries(window.navigator.plugins).map(
    ([, plugin]) => plugin.name
  )

  return {
    plugins,
  }
}
