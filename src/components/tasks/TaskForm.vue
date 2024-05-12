<template>
  <VForm
    ref="form"
    class="task-form"
    @submit.prevent="submitForm"
  >
    <div class="task-form__group">
      <VSelect
        v-model="formFields.actionType"
        :items="actionTypeOptions"
        :rules="[rules.required]"
        label="Тип дії"
      />
    </div>
    <div class="task-form__group">
      <VTextField
        v-model.trim="formFields.detail"
        :rules="[rules.required]"
        label="Деталь/рідина"
      />
    </div>
    <div class="task-form__group">
      <VTextField
        v-model.number.trim="formFields.mileage"
        type="number"
        :rules="[rules.required, rules.milage]"
        label="Пробіг"
      />
    </div>

    <div class="task-form__group">
      <VTextField
        v-if="formFields.actionType === 'change' && formFields.isChangeReminder === true"
        v-model.number.trim="formFields.frequency"
        type="number"
        :rules="[rules.required, rules.frequency]"
        label="Частота заміни (км)"
      />
    </div>
    <VSwitch
      v-if="formFields.actionType === 'change'"
      v-model="formFields.isChangeReminder"
      label="Отримати підказку для наступної заміни"
      color="primary"
    />
    <div class="task-form__group">
      <VDatePicker
        v-model="formFields.date"
        :allowed-dates="allowedDates"
        :hide-header="true"
        theme="dark"
        label="Дата"
        width="100%"
      />

      <div class="task-form__group__error">
        <span v-if="!formFields.date && !dateIsValid">Оберіть дату</span>
      </div>
    </div>
    <div class="task-form__controls">
      <BaseButton
        mode="primary-btn"
        type="submit"
      >
        <slot name="submit">
          Додати
        </slot>
      </BaseButton>

      <BaseButton
        mode="outline-btn"
        type="button"
        @click="cancelForm"
      >
        <slot name="cancel">
          Скасувати
        </slot>
      </BaseButton>
    </div>
  </VForm>
</template>

<script>
export default {
  props: {
    segment: {
      type: String,
      default: null,
      required: false,
    },
    task: {
      type: Object,
      default: null,
      required: false,
    },
  },
  emits: ['submit-form', 'cancel'],
  data() {
    return {
      dateIsValid: true,
      formFields: {
        actionType: this.task?.actionType || 'change',
        detail: this.task?.detail || '',
        mileage: this.task?.mileage || '',
        frequency: this.task?.frequency || '',
        isChangeReminder: !!this.task?.isChangeReminder || false,
        date: this.task?.date ? new Date(this.task.date) : null,
      },
      rules: {
        required: v => !!v || 'Обов\'язкове поле',
        milage: v => v >= 0 || 'Пробіг повинен бути більше 0',
        frequency: v => v >= 0 || 'Частота повинна бути більше 0',
      },
      actionTypeOptions: [
        { title: 'Заміна', value: 'change' },
        { title: 'Ремонт', value: 'repair' },
        { title: 'Встановлення', value: 'instalation' },
      ],
    }
  },

  computed: {
    allowedDates() {
      const allowedDates = []
      const today = new Date()

      // if segment is 'history' then allowed dates due to the current date

      if (this.segment === 'history') {
        for (let i = 0; i < 3652; i++) {
          const date = new Date(today)
          date.setDate(today.getDate() - i)
          allowedDates.push(date)
        }
      }
      else if (this.segment === 'todo') {
        // if segment is 'todo' then allowed dates from the current date
        for (let i = 0; i < 3652; i++) {
          const date = new Date(today)
          date.setDate(today.getDate() + i)
          allowedDates.push(date)
        }
      }

      return allowedDates
    },
  },
  methods: {
    async submitForm() {
      const { valid } = await this.$refs.form.validate()
      const date = this.formFields.date ? this.formFields.date.toLocaleDateString('uk-UA') : null
      if (valid && date) {
        this.dateIsValid = true
        this.$emit('submit-form', {
          ...this.formFields,
          date,
          completed: this.segment === 'history',
        })
      }
      else {
        this.dateIsValid = false
      }
    },
    cancelForm() {
      this.$emit('cancel')
    },
  },
}
</script>

<style scoped lang="scss">

.task-form {
  &__group {
    margin-bottom: 8px;
  }

  &__controls {
    margin-top: 35px;
  }

  &__group__error {
    color: #b00020;
    font-size: 12px;
    padding: 5px 10px 0;
  }

}
</style>
