<template>
  <div class="dropdown">
    <BaseButton mode="dropdown-btn" @click="toggleDropdown">
      <slot name="button" />
    </BaseButton>
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="dropdown__content"
        @click="toggleDropdown"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss" scoped>
  .dropdown {
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 200px;
  }

  .dropdown__content {
    position: absolute;
    width: calc(100% - 22px);
    left: 0;
    top: 100%;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0 0 4px 4px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
    transition: top 0.3s;
    width: 100%;
  }

  .fade-enter-active {
    transition: all 0.3s;
  }

  .fade-leave-active {
    transition: all 0.1s;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  .fade-enter-to, .fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

</style>
