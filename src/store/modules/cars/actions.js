export default {
  async addCar(context, data) {
    const userId = context.rootGetters.userId
    const token = context.rootGetters.token

    const response = await fetch(`https://car-manager-5d9e6-default-rtdb.firebaseio.com/cars/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to add car')
      throw error
    }

    context.commit('addCar', {
      ...data,
      id: responseData.name,
    })
  },
  async loadCars(context) {
    const userId = context.rootGetters.userId
    const token = context.rootGetters.token

    const response = await fetch(`https://car-manager-5d9e6-default-rtdb.firebaseio.com/cars/${userId}.json?auth=${token}`)

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch cars')
      throw error
    }

    const cars = []

    // eslint-disable-next-line no-restricted-syntax
    for (const key in responseData) {
      const car = {
        id: key,
        brand: responseData[key].brand,
        model: responseData[key].model,
        year: responseData[key].year,
        currentMilage: responseData[key].currentMilage,
        milagePerMonth: responseData[key].milagePerMonth,
        engineCapacity: responseData[key].engineCapacity,
        fuelType: responseData[key].fuelType,
        vin: responseData[key].vin,
        carNumber: responseData[key].carNumber,
        image: responseData[key].image,
      }
      cars.push(car)
    }

    context.commit('setCars', cars)
  },

  async updateCar(context, data) {
    const userId = context.rootGetters.userId
    const token = context.rootGetters.token

    const response = await fetch(`https://car-manager-5d9e6-default-rtdb.firebaseio.com/cars/${userId}/${data.id}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to update car')
      throw error
    }

    context.commit('updateCar', data)
  },
}
