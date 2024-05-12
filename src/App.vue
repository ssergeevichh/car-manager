<template>
  <TheHeader />
  <RouterView />
  <TheNavigation v-if="selectedCar" />
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheNavigation from './components/layout/TheNavigation.vue'

export default {
  components: {
    TheHeader,
    TheNavigation,
  },
  computed: {
    selectedCar() {
      return this.$store.getters.selectedCar
    },
    didAutoLogout() {
      return this.$store.getters.isAutoLogout
    },
  },
  watch: {
    didAutoLogout(currentAutoLogoutState, oldAutoLogoutState) {
      if (!!currentAutoLogoutState && currentAutoLogoutState !== oldAutoLogoutState) {
        this.$router.replace('/auth')
      }
    },

  },
  async created() {
    await this.tryLogin()
  },
  methods: {
    async tryLogin() {
      try {
        await this.$store.dispatch('tryLogin')
      }
      catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
