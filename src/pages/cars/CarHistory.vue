<template>
  <CarTasks
    :id="id"
    :car-id="carId"
    segment="history"
  >
    <template #title>
      Історія
    </template>
  </CarTasks>
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
