import { createStore } from 'vuex'

import authModule from './modules/auth/index.js'
import carsModule from './modules/cars/index.js'
import tasksModule from './modules/tasks/index.js'

const store = createStore({
  modules: {
    auth: authModule,
    cars: carsModule,
    tasks: tasksModule,
  },
})

export default store
