<template>
  <BaseCard v-if="selectedCar">
    <div class="title">
      {{ titleCaption }}
    </div>
    <div v-if="!isEditing" class="car-info">
      <img
        class="car-info__img"
        :src="image"
        :alt="brand"
      >
      <div class="header-wrapper">
        <h2>
          {{ title }}
        </h2>
        <BaseButton mode="primary-btn" @click="toggleEdit">
          <span>Edit</span>
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.0434 3.36667C15.3684 3.04167 15.3684 2.50001 15.0434 2.19167L13.0934 0.241675C12.785 -0.0833252 12.2434 -0.0833252 11.9184 0.241675L10.385 1.76667L13.51 4.89167M0.285034 11.875V15H3.41003L12.6267 5.77501L9.5017 2.65001L0.285034 11.875Z" fill="white" />
          </svg>
        </BaseButton>
      </div>
      <div class="info-wrapper car-info__wrapper">
        <div class="info-item">
          <div class="info-item__hint">
            Current milage:
          </div>
          <div class="info-item__value">
            {{ milage }} km
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__hint">
            Year:
          </div>
          <div class="info-item__value">
            {{ year }}
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__hint">
            Fuel type:
          </div>
          <div class="info-item__value">
            {{ fuelType }}
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__hint">
            Engine capacity:
          </div>
          <div class="info-item__value">
            {{ capacity }}
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__hint">
            Car number:
          </div>
          <div class="info-item__value">
            {{ carNumber }}
          </div>
        </div>
        <div class="info-item info-wrapper__vin">
          <div class="info-item__hint info-wrapper__vin__hint">
            VIN-code:
          </div>
          <div class="info-item__value info-wrapper__vin__value">
            {{ vinCode }}
          </div>
          <BaseButton
            mode="outline-btn"
            class="info-wrapper__vin__btn"
            @click="copyToClipboard(vinCode)"
          >
            <svg
              width="15"
              height="17"
              viewBox="0 0 15 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.25 15.3383H5V4.83826H13.25M13.25 3.33826H5C4.60218 3.33826 4.22064 3.49629 3.93934 3.7776C3.65804 4.0589 3.5 4.44043 3.5 4.83826V15.3383C3.5 15.7361 3.65804 16.1176 3.93934 16.3989C4.22064 16.6802 4.60218 16.8383 5 16.8383H13.25C13.6478 16.8383 14.0294 16.6802 14.3107 16.3989C14.592 16.1176 14.75 15.7361 14.75 15.3383V4.83826C14.75 4.44043 14.592 4.0589 14.3107 3.7776C14.0294 3.49629 13.6478 3.33826 13.25 3.33826ZM11 0.338257H2C1.60218 0.338257 1.22064 0.496292 0.93934 0.777597C0.658035 1.0589 0.5 1.44043 0.5 1.83826V12.3383H2V1.83826H11V0.338257Z" fill="#717171" />
            </svg>

            <span>Copy</span>
          </BaseButton>
        </div>
      </div>
      <BaseButton mode="remove-btn">
        <span>Remove</span>
      </BaseButton>
    </div>
    <CarForm
      v-else
      :car="selectedCar"
      @submit-data="submitForm"
      @cancel="cancelForm"
    >
      <template #cancel>
        Cancel
      </template>
      <template #submit>
        Save
      </template>
    </CarForm>
  </BaseCard>
</template>

<script>
import CarForm from '@/components/cars/CarForm.vue'

export default {
  components: {
    CarForm,
  },
  props: ['carId'],
  data() {
    return {
      selectedCar: null, // ask about this
      isEditing: false,
    }
  },
  computed: {
    title() {
      return `${this.selectedCar.brand} ${this.selectedCar.model} | ${this.selectedCar.year}`
    },
    image() {
      return `${this.selectedCar.image}`
    },
    brand() {
      return this.selectedCar.brand
    },
    model() {
      return this.selectedCar.model
    },
    year() {
      return this.selectedCar.year
    },
    milage() {
      return this.selectedCar.currentMilage
    },
    fuelType() {
      return this.selectedCar.fuelType
    },
    capacity() {
      return this.selectedCar.engineCapacity
    },
    carNumber() {
      return this.selectedCar.carNumber
    },
    vinCode() {
      return this.selectedCar.vin
    },
    cars() {
      return this.$store.getters.cars
    },
    titleCaption() {
      return this.isEditing ? 'Редагування авто' : 'Інформація про авто'
    },
    isSelectedCar() {
      return this.$store.getters.selectedCar
    },
  },

  watch: {
    cars() {
      this.setSelectedCar()
    },
    carId() {
      this.setSelectedCar()// todo: check if it works
    },
  },

  async created() {
    await this.loadCars()
    this.setSelectedCar()
  },

  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
    },
    setSelectedCar() {
      const isSelectedCar = this.$store.getters.selectedCar
      if (!isSelectedCar) {
        this.selectedCar = this.$store.getters.cars.find(car => car.id === this.carId)
        this.$store.commit('setSelectedCar', this.selectedCar)
      }
      else {
        this.selectedCar = isSelectedCar
      }
    },
    toggleEdit() {
      this.isEditing = !this.isEditing
    },
    cancelForm() {
      this.isEditing = false
    },
    async submitForm(data) {
      try {
        await this.$store.dispatch('updateCar', { id: this.selectedCar.id, ...data })
        this.setSelectedCar()
        this.isEditing = false
      }
      catch (error) {
        console.error(error)
      }
    },

    async loadCars() {
      try {
        await this.$store.dispatch('loadCars')
      }
      catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.car-info {
  &__img {
    border-radius: 4px;
    height: 500px;
    width: 100%;
  }

  &__wrapper {
    margin-bottom: 25px;
  }
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 5px;

  &__hint {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5)
  }

  &__value {
    font-size: 18px;
  }

}

.info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &__vin {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  &__vin__hint {
    grid-area: 1 / 1 / 2 / 3; // Updated grid area to span 2 columns
  }

  &__vin__value {
    grid-area: 2 / 1 / 3 / 3; // Updated grid area to span 2 columns
  }

  &__vin__btn {
    grid-area: 1 / 3 / 3 / 4;
    align-self: center;
    justify-self: end;
  }
}

</style>
