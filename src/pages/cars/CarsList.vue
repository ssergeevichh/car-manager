<template>
  <BaseCard>
    <section class="cars-home">
      <div class="title">
        Cars
      </div>
      <ul v-if="userCars.length > 0" class="cars-list">
        <HomeCar
          v-for="car in userCars"
          :id="car.id"
          :key="car.id"
          :brand="car.brand"
          :model="car.model"
          :milage="car.currentMilage"
          :year="car.year"
          :fuel-type="car.fuelType"
          :image="car.image"
          :capacity="car.engineCapacity"
          :car-number="car.carNumber"
        />
      </ul>
      <div v-else class="cars-home__no-cars">
        You don't have a car yet!
      </div>
      <BaseButton
        mode="add-car"
        link
        :to="addCarLink"
      >
        +
      </BaseButton>
    </section>
  </BaseCard>
</template>

<script>
import HomeCar from '@/components/cars/HomeCar.vue'

export default {
  components: {
    HomeCar,
  },

  computed: {
    addCarLink() {
      const id = this.$store.getters.userId
      return `/${id}/add`
    },
    userCars() {
      return this.$store.getters.cars
    },
  },

  created() {
    this.loadCars()
  },
  methods: {
    loadCars() {
      try {
        this.$store.dispatch('loadCars')
      }
      catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.cars-home {
  position: relative;
  &__no-cars {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

.cars-list {
  padding: 0;
  list-style-type: none;
}
</style>
