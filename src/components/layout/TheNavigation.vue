<template>
  <BaseCard>
    <nav class="navigation">
      <ul class="navigation-list">
        <li>
          <BaseButton
            mode="navigation-link"
            link
            :to="infoLink"
          >
            <img src="@/assets/images/navigation-icons/car-info.svg" alt="car-info">
            <span>Авто</span>
          </BaseButton>
        </li>
        <li>
          <BaseButton
            mode="navigation-link"
            link
            :to="historyLink"
          >
            <img src="@/assets/images/navigation-icons/history.svg" alt="history">
            <span>Історія</span>
          </BaseButton>
        </li>
        <li>
          <BaseButton
            mode="navigation-link"
            link
            :to="todoLink"
          >
            <img src="@/assets/images/navigation-icons/todo.svg" alt="plans">
            <span>Плани</span>
          </BaseButton>
        </li>
      </ul>
    </nav>
  </BaseCard>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  computed: {
    selectedCarId() {
      return this.$store.getters.selectedCar.id
    },
    userId() {
      return this.$store.getters.userId
    },
    infoLink() {
      return `/${this.userId}/cars/${this.selectedCarId}/info`
    },
    historyLink() {
      return `/${this.userId}/cars/${this.selectedCarId}/history`
    },
    todoLink() {
      return `/${this.userId}/cars/${this.selectedCarId}/todo`
    },
  },
}
</script>

<style lang="scss" scoped>
  .navigation {
    position: fixed;
    width: calc(100% - 60px);
    max-width: calc(40rem - 60px);
    bottom: 10px;
    background-color: $primary-color;
    border-radius: 12px;
    padding: 8px;
    margin: 0 10px;

    &-list {
      display: flex;
      gap: 10px;
      justify-content: space-between;
      padding: 0;
      margin: 0;

      li {
        flex-grow: 1;
        list-style-type: none;
        height: 100%;
      }

      img {
        width: 20px;
        height: 18px;
      }
    }
  }
</style>
