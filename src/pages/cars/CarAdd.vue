<template>
  <BaseCard>
    <section class="car-add">
      <div class="title">
        Додати авто
      </div>
      <CarForm @submit-data="submitForm" @cancel="cancelForm">
        <template #cancel>
          Відмінити
        </template>
        <template #submit>
          + Додати
        </template>
      </CarForm>
    </section>
  </BaseCard>
</template>

<script>
import CarForm from '@/components/cars/CarForm.vue'

export default {
  components: {
    CarForm,
  },
  computed: {
    carsLink() {
      const id = this.$store.getters.userId
      return `/${id}/cars`
    },
  },

  methods: {
    async submitForm(data) {
      try {
        await this.$store.dispatch('addCar', data)
        this.$router.push(this.carsLink)
      }
      catch (error) {
        console.error(error)
      }
    },

    cancelForm() {
      this.$router.push(this.carsLink)
    },

  },
}
</script>

<style lang="scss" scoped>
  .car-add-form {
    &__group {
      margin-bottom: 10px;
    }
    &__controls {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }
  }
</style>
