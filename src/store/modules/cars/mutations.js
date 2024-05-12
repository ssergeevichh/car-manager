export default {
  addCar(state, payload) {
    state.cars.push(payload)
  },
  setCars(state, payload) {
    state.cars = payload
  },
  setSelectedCar(state, payload) {
    state.selectedCar = payload
  },
  updateCar(state, payload) {
    const carIndex = state.cars.findIndex(car => car.id === payload.id)
    state.cars[carIndex] = payload
  },
}
