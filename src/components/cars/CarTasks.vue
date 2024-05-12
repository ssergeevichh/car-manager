<template>
  <BaseCard>
    <div class="title">
      <slot name="title" />
    </div>
    <section class="tasks tasks--history">
      <ul
        class="tasks-list"
      >
        <TaskItem
          v-for="item in tasks"
          :id="item.id"
          :key="item.id"
          :date="item.date"
          :completed="item.completed"
          :action-type="item.actionType"
          :detail="item.detail"
          :mileage="item.mileage"
          :frequency="item.frequency"
          :is-change-reminder="item.isChangeReminder"
          :segment="segment"
          @edit-task="setEditTaskMode"
          @complete-task="completeTask"
        />
      </ul>
    </section>

    <VDialog
      v-model="dialog"
      max-width="400"
      content-class="task-form-dialog"
    >
      <template #activator="{ on }">
        <BaseButton
          mode="primary-btn"
          v-bind="on"
          @click="dialog = true"
        >
          + Додати запис
        </BaseButton>
      </template>

      <div class="task-form-content">
        <div class="task-form-content__subtitle">
          {{ dialogCaptionSubtitle }}
        </div>
        <TaskForm
          :segment="segment"
          :task="task.info"
          @submit-form="submitForm"
          @cancel="dialog = false"
        >
          <template #submit>
            {{ dialogSubtitleCaption }}
          </template>
        </TaskForm>
      </div>
    </VDialog>
  </BaseCard>
</template>

<script>
import TaskItem from '@/components/tasks/TaskItem.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'

export default {
  components: {
    TaskItem,
    TaskForm,
  },
  props: ['id', 'carId', 'segment'],
  data() {
    return {
      dialog: false,
      task: {
        info: {},
        id: '',
      },
      isEditing: false,
    }
  },

  computed: {
    tasks() {
      const allTasks = this.$store.getters.tasks

      const selectedCarData = allTasks.find(tasks => tasks.id === this.carId)
      const selectedCarTasks = selectedCarData ? selectedCarData.tasks : []

      if (this.segment === 'history') {
        return selectedCarTasks.filter(task => task.completed === true)
      }
      else if (this.segment === 'todo') {
        return selectedCarTasks.filter(task => task.completed === false)
      }
      else {
        return 0
      }
    },

    selectedCar() {
      return this.$store.getters.selectedCar
    },

    dialogCaptionSubtitle() {
      return this.isEditing ? 'Редагувати запис' : 'Додати запис'
    },

    dialogSubtitleCaption() {
      return this.isEditing ? 'Редагувати запис' : 'Додати запис'
    },
  },

  async created() {
    await this.loadCars()
    await this.loadTasks()
    this.setSelectedCar()
  },
  methods: {
    async submitForm(task) {
      try {
        if (this.isEditing) {
          await this.$store.dispatch('updateTask', {
            taskInfo: task,
            id: this.task.id,
          })
        }
        else {
          await this.$store.dispatch('addTask', task)
        }
      }
      catch (error) {
        console.error(error)
      }
      this.isEditing = false
      this.dialog = false
    },
    async loadTasks() {
      try {
        if (!this.tasks.length) {
          await this.$store.dispatch('loadTasks', this.carId)
        }
      }
      catch (error) {
        console.error(error)
      }
    },

    setEditTaskMode(id) {
      this.dialog = true
      this.isEditing = true
      this.task.id = id
      this.task.info = this.getTaskById(id)
    },

    async loadCars() {
      try {
        if (!this.selectedCar || !this.tasks.length) {
          await this.$store.dispatch('loadCars')
        }
      }
      catch (error) {
        console.error(error)
      }
    },

    async completeTask(id) {
      const task = this.getTaskById(id)
      try {
        await this.$store.dispatch('updateTask', {
          taskInfo: {
            ...task,
            completed: true,
          },
          id,
        })
      }
      catch (error) {
        console.error(error)
      }
    },

    getTaskById(id) {
      return this.tasks.find(task => task.id === id)
    },

    setSelectedCar() {
      const selectedCar = this.$store.getters.cars.find(car => car.id === this.carId)
      this.$store.commit('setSelectedCar', selectedCar)
    },
  },

}
</script>

<style lang="scss">
  .tasks {
    padding-bottom: 20px;
  }

   .tasks-list {
    padding: 0;
    border: 2px solid #323232;
    border-width: 0 2px;
    overflow: hidden;
  }

  .task-form-content {
    background-color: #323232;
    padding: 20px;
    border-radius: 10px;
    overflow: auto;

    &__subtitle {
      color: #fff;
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: 600;
    }
  }
</style>
