<template>
  <li class="home-car">
    <RouterLink
      :to="{ name: 'CarInfo', params: { carId: id, id: userId } }"
    >
      <div class="image-wrapper">
        <img
          class="image-wrapper__img"
          :src="image"
          :alt="brand"
        >
      </div>
      <div class="short-info-wrapper">
        <div class="short-info-wrapper__title">
          {{ brand }} {{ model }}
        </div>
        <div class="info-items">
          <div class="info-item">
            <img src="@/assets/images/home-car-icons/milage.svg" alt="milage">
            <span>{{ milage }} km</span>
          </div>
          <div class="info-item">
            <img src="@/assets/images/home-car-icons/fuel.svg" alt="fuel">
            <span>{{ engine }}</span>
          </div>
          <div class="info-item">
            <img src="@/assets/images/home-car-icons/calendar.svg" alt="fuel">
            <span>{{ year }}</span>
          </div>
          <div class="info-item info-items__car-number">
            {{ carNumber }}
          </div>
        </div>
      </div>
    </RouterLink>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    milage: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    carNumber: {
      type: String,
      required: true,
    },
  },
  computed: {
    engine() {
      return `${this.fuelType}, ${(this.capacity / 1000).toFixed(1)}L`
    },
    userId() {
      return this.$store.getters.userId
    },
  },
}
</script>

<style lang="scss" scoped>
.home-car {
  background-color: #3C3C3C;
  border-radius: 10px;
  margin-bottom: 20px;
}

a {
  text-decoration: none;
  color: inherit;
}

.short-info-wrapper {
  padding: 20px;
  &__title {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
  }
}

.image-wrapper {
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  overflow: hidden;

  &__img {
    width: 100%;
    object-fit: cover;
    margin: 0 auto;
    display: block;
    max-height: 500px;
  }
}

.info-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  &__car-number {
    background-color: #fff;
    border: solid #07499d;
    border-width: 2px 25px;
    border-radius: 3px;
    padding: 0 5px 0 3px;
    font-size: 13px;
    justify-content: center;
    line-height: 18px;
    color: rgb(68, 68, 68);
    position: relative;
    align-items: self-end !important;

    &::before {
      content: '';
      border-top: 5px solid #00a7ef;
      border-bottom: 5px solid #fed500;
      width: 15px;
      position: absolute;
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
    }

    &::after {
      content: 'UA';
      position: absolute;
      right: -21px;
      color: white;
      top: 50%;
      transform: translateY(-42%);

    }
  }
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;

  &:not(:last-child) {
    padding-right: 15px;
  }

  span {
    margin-top: 5px;
    white-space: nowrap;
  }
}
</style>
