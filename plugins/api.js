import CarService from '~/api/services/car.service'
import FingerprintService from "~/api/services/fingerprint.service";

export default ({ $axios }, inject) => {
  // Inject $api in Vue, context and store.
  inject('api', {
    cars: new CarService($axios),
    fingerprint: new FingerprintService($axios),
  })
}
