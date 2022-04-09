export default class CarService {
  constructor(axios) {
    this.axios = axios
  }

  list() {
    return this.axios.get('/cars').then((res) => res.data)
  }
}
