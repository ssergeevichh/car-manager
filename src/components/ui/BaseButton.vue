<template>
  <button
    v-if="!link"
    :class="mode"
  >
    <slot />
  </button>
  <RouterLink
    v-else
    :to="to"
    :class="mode"
  >
    <slot />
  </RouterLink>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
    },
    link: {
      type: Boolean,
      default: false,
      required: false,
    },
    to: {
      type: String,
      default: '/',
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
  button, a {
    padding: 6px 14px;
    background-color: rgba(255, 255, 255, 0.12);
    border: none;
    cursor: pointer;
    border-radius: 4px;
    max-width: 100%;
    color: white;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s;
    text-decoration: none;
  }

  button:hover, button:active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .primary-btn {
    background-color: $primary-color;
    float: right;

    &:hover {
      background-color: $primary-color-light;
    }
  }

  .dropdown-btn {
    font-size: 16px;
    width: 100%;
    justify-content: space-between;
  }

  .dropdown-btn::after {
    content: '';
    clip-path: polygon(50% 45%, 0 0, 100% 0);
    width: 13px;
    height: 15px;
    display: inline-block;
    background-color: white;
    align-self: flex-end;
  }

  .dropdown-link {
    color: black;
    padding: 5px 0;
    justify-content: flex-start;
  }

  .outline-btn {
    background-color: transparent;
    border: 1px solid #ffffff1d;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .add-car {
    background-color: rgba(58, 45, 38, 1);
    position: sticky;
    display: flex;
    bottom: 10px;
    border-radius: 100%;
    margin-right: 10px;
    font-size: 50px;
    line-height: 1;
    float: right;
    width: 70px;
    height: 70px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .navigation-link {
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 12px;
    height: 100%;
    gap: 5px;
    justify-content: space-between;
    flex-direction: column;
    background-color: transparent;

    &:hover {
      background-color: rgba(255, 255, 255, 0.12);
    }
  }

  .navigation-link.router-link-active {
    background-color: rgba(255, 255, 255, 0.12);
  }

  .remove-btn {
    background-color: rgba(255, 80, 92, 0.12);
    color: #FF505C;

    &:hover {
      background-color: rgba(255, 80, 92, 0.2);
    }
  }

  .btn-control {
    width: 57px;
    border-radius: 0;

    &--edit {
      background-color: #888888;

      &:hover {
        background-color: #A0A0A0;
      }
    }

    &--remove {
      background-color: #FF0000;

      &:hover {
        background-color: #FF505C;
      }
    }

    &--complete {
      background-color: $primary-color;

      &:hover {
        background-color: $primary-color-light;
      }
    }
  }

</style>
