import { createRouter, createWebHistory } from 'vue-router'

import CarsList from './pages/cars/CarsList.vue'
import CarInfo from './pages/cars/CarInfo.vue'
import CarAdd from './pages/cars/CarAdd.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import CarHistory from './pages/cars/CarHistory.vue'
import CarTodo from './pages/cars/CarTodo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:id/cars',
      component: CarsList,
      name: 'CarsList',
      props: true,
    },
    {
      path: '/:id/add', // todo: change to /:id/cars/add
      component: CarAdd,
    },
    {
      path: '/:id/cars/:carId/info',
      component: CarInfo,
      name: 'CarInfo',
      props: true,
    },
    {
      path: '/:id/cars/:carId/history',
      component: CarHistory,
      name: 'CarHistory',
      props: true,
    },
    {
      path: '/:id/cars/:carId/todo',
      component: CarTodo,
      name: 'CarTodo',
      props: true,
    },
    {
      path: '/auth',
      component: UserAuth,
    },
  ],
})

export default router
