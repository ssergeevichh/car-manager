<template>
  <li
    :key="id"
    v-drag="handleDragging"
    class="task-item"
    :class="{ 'task-item--completed': completed, 'task-item--todo': !completed}"
    :style="{ transform: `translateX(${offset}px)` }"
  >
    <div class="task-item-content">
      <div class="task-item-content__name">
        {{ actionTypeText }}: {{ detail }}
      </div>
      <div v-if="segment === 'history'" class="task-item-content__info">
        {{ mileage }} КМ ({{ formattedDate }})
      </div>
      <div v-else class="task-item-content__info">
        Заплановано на {{ formattedDate }} або при пробігу {{ mileage }} КМ
      </div>
    </div>
    <div class="extra-actions" :style="{ right: `-${offsetLimit}px` }">
      <BaseButton mode="btn-control btn-control--remove">
        <img src="@/assets/images/tasks-icons/remove.svg" alt="Видалити">
      </BaseButton>
      <BaseButton
        mode="btn-control btn-control--edit"
        @click="editTask"
      >
        <img src="@/assets/images/tasks-icons/edit.svg" alt="Редагувати">
      </BaseButton>
      <BaseButton
        v-if="segment==='todo'"
        mode="btn-control btn-control--complete"
        @click="completeTask"
      >
        <img src="@/assets/images/tasks-icons/checkmark.svg" alt="Виконати">
      </BaseButton>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    actionType: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    frequency: {
      type: Number,
      required: false,
    },
    isChangeReminder: {
      type: Boolean,
      required: false,
    },
    segment: {
      type: String,
      required: true,
    },
  },
  emits: ['edit-task', 'complete-task'],

  data() {
    return {
      offset: 0,
      offsetLimits: [
        {
          segment: 'history',
          limit: 114, // two buttons width
        },
        {
          segment: 'todo', // three buttons width
          limit: 171,
        },
      ],
    }
  },

  computed: {
    formattedDate() {
      return this.date.split('-').reverse().join('.')
    },
    actionTypeText() {
      if (this.actionType === 'instalation' && this.segment === 'history') {
        return 'Встановлено'
      }
      else if (this.actionType === 'instalation' && this.segment === 'todo') {
        return 'Встановити'
      }
      else if (this.actionType === 'change' && this.segment === 'history') {
        return 'Замінено'
      }
      else if (this.actionType === 'change' && this.segment === 'todo') {
        return 'Замінити'
      }
      else if (this.actionType === 'repair' && this.segment === 'history') {
        return 'Відремонтовано'
      }
      else if (this.actionType === 'repair' && this.segment === 'todo') {
        return 'Відремонтувати'
      }
      else {
        return 'Невідома дія'
      }
    },

    offsetLimit() {
      return this.offsetLimits.find(limit => limit.segment === this.segment).limit
    },
  },

  methods: {
    handleDragging(event) {
      if (event.movement[0] > 0) {
        this.offset = 0
      }
      else if (event.movement[0] < -(+this.offsetLimit)) {
        this.offset = -this.offsetLimit
      }
      else if (event.movement[0] < -10) {
        this.offset = event.movement[0] < -10 && event.last ? -(+this.offsetLimit) : event.movement[0]
      }
    },

    editTask() {
      this.offset = 0
      this.$emit('edit-task', this.id)
    },

    completeTask() {
      this.$emit('complete-task', this.id)
    },
  },

}
</script>

<style scoped lang="scss">
  .task-item {
    position: relative;
    padding: 4px 10px 4px 38px;
    list-style-type: none;
    line-height: 1.4;
    border-bottom: 2px solid #323232;
    background-repeat: no-repeat;
    background-position: 10px 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s;

    &:first-child {
      border-top: 2px solid #323232;
    }

    &--completed {
      background-image: url('@/assets/images/tasks-icons/completed.svg');
    }

    &--todo {
      background-image: url('@/assets/images/tasks-icons/todo.svg');
    }
  }

  .task-item-content {
    &__name {
      font-weight: 600;
      font-size: 18px;
    }

    &__info {
      font-size: 16px;
      font-weight: 500;
      color: #656565;
    }
  }

  .extra-actions {
    width: auto;
    position: absolute;
    right: -114px;
    height: 100%;
    top: 0;
    bottom: 0;
    background-color: #323232;
    display: flex;

    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      right: 0;
      width: 100%;
      height: 2px;
      border-bottom: 2px solid #323232;
    }

      &::before {
        content: '';
        position: absolute;
        top: -2px;
        right: 0;
        width: 100%;
        height: 2px;
        border-top: 2px solid #323232;
      }

  }
</style>
