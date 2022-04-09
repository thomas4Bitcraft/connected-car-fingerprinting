export default class FingerprintService {
  constructor(axios) {
    this.axios = axios
  }

  save(data) {
    return this.axios.post('/fingerprints', data)
  }

  check(data) {
    return this.axios.post('/fingerprints/check', data).then((res) => res.data)
  }

  testResult(data) {
    return this.axios.post('/tests', data)
  }
}
