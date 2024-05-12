<template>
  <header class="header">
    <div class="header__left">
      <svg
        width="31"
        height="29"
        viewBox="0 0 31 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M27.0667 18.4896C27.0812 18.2709 27.125 18.0521 27.125 17.8334V18.5625L27.0667 18.4896ZM12.5417 17.8334C12.5417 18.8688 12.7604 19.8605 13.1542 20.75H5.25V22.2084C5.25 23.0105 4.59375 23.6667 3.79167 23.6667H2.33333C1.53125 23.6667 0.875 23.0105 0.875 22.2084V10.5417L3.90833 1.79171C4.2 0.945874 5.01667 0.333374 5.97917 0.333374H22.0208C22.9833 0.333374 23.8 0.945874 24.0917 1.79171L27.125 10.5417V17.8334C27.125 13.8084 23.8583 10.5417 19.8333 10.5417C15.8083 10.5417 12.5417 13.8084 12.5417 17.8334ZM8.16667 14.1875C8.16667 12.9771 7.18958 12 5.97917 12C4.76875 12 3.79167 12.9771 3.79167 14.1875C3.79167 15.398 4.76875 16.375 5.97917 16.375C7.18958 16.375 8.16667 15.398 8.16667 14.1875ZM24.2083 9.08337L22.0208 2.52087H5.97917L3.79167 9.08337H24.2083ZM29.8521 25.4021L23.8583 19.4084C24.4562 17.8917 24.1208 16.1125 22.8667 14.873C21.5542 13.5459 19.5854 13.2834 17.9958 14.0125L20.825 16.8417L18.8562 18.825L15.9542 15.9813C15.1667 17.5709 15.5312 19.5396 16.8146 20.8667C18.0688 22.1209 19.8333 22.4417 21.3646 21.8584L27.3583 27.8375C27.6208 28.1146 28.0146 28.1146 28.2771 27.8375L29.7937 26.3355C30.1146 26.073 30.1146 25.6063 29.8521 25.4021Z" fill="white" />
      </svg>
      <RouterLink
        :to="carsLink"
        class="logo"
        @click="setSelectedCar"
      >
        <h1>CarManager</h1>
      </RouterLink>
    </div>
    <div class="header__right">
      <BaseDropdown v-if="isLoggedIn && selectedCar">
        <template #button>
          {{ selectedCarTitle }}
        </template>
        <ul class="cars-links">
          <li v-for="car in carDetails" :key="car.id">
            <BaseButton
              link
              mode="dropdown-link"
              :to="car.to"
            >
              {{ car.text }}
            </BaseButton>
          </li>
        </ul>
      </BaseDropdown>
      <BaseButton
        v-if="isLoggedIn"
        mode="outline-btn"
        @click="logout"
      >
        Logout
      </BaseButton>
    </div>
  </header>
</template>

<script>

import BaseDropdown from '../ui/BaseDropdown.vue'

export default {
  components: {
    BaseDropdown,
  },
  computed: {
    carDetails() {
      return this.userCars.map(car => ({
        id: car.id,
        text: `${car.brand} ${car.model}`,
        to: `/${this.userId}/cars/${car.id}/info`,
      }))
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    userCars() {
      return this.$store.getters.cars
    },
    userId() {
      return this.$store.getters.userId
    },
    selectedCar() {
      return this.$store.getters.selectedCar
    },
    selectedCarTitle() {
      return this.selectedCar ? `${this.selectedCar.brand} ${this.selectedCar.model}` : 'Select a car'
    },
    carsLink() {
      return `/${this.userId}/cars`
    },
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/auth')
    },
    setSelectedCar() {
      this.$store.commit('setSelectedCar', null)
    },
  },
}
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    gap: 20px;
    background-color: $primary-color;
  }

  h1 {
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 10px;
  }

  .logo {
    text-decoration: none;
  }

  .header {
    &__left{
      display: flex;
      align-items: center;
    }

    &__right {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      justify-content: flex-end;
    }
  }

  .cars-links {
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: white;
  }

  @media only screen and (max-width: 575px) {
    h1 {
      display: none;
    }
  }

</style>
