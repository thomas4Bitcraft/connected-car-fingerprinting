export const state = () => ({
  httpData: {},
})

export const mutations = {
  setData(state, data) {
    state.httpData = data
  },
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const headers = req.headers
    commit('setData', {
      userAgent: headers['user-agent'],
      accept: headers.accept,
      contentEncoding: headers['accept-encoding'],
      headers: Object.keys(headers).sort(),
    })
  },
}
