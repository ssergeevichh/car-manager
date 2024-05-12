<template>
  <CarTasks
    :id="id"
    :car-id="carId"
    segment="todo"
  >
    <template #title>
      Заплановані
    </template>
  </CarTasks>
  <section class="car-todo-hints" />
</template>

<script>
import CarTasks from '@/components/cars/CarTasks.vue'

export default {
  components: {
    CarTasks,
  },
  props: ['id', 'carId'],

}
</script>
