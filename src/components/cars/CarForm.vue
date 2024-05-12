<template>
  <VForm
    ref="form"
    class="car-form"
    @submit.prevent="submitForm"
  >
    <div class="car-form__group">
      <VTextField
        v-model.trim="formFields.brand"
        :rules="[rules.required]"
        label="Бренд"
      />
    </div>
    <div class="car-form__group">
      <VTextField
        v-model.trim="formFields.model"
        :rules="[rules.required]"
        label="Модель"
      />
    </div>
    <div class="car-form__group">
      <VTextField
        v-model.number="formFields.year"
        type="number"
        :rules="[rules.required, rules.year]"
        label="Рік випуску"
      />
    </div>
    <div class="car-form__group">
      <VTextField
        v-model.number.trim="formFields.currentMilage"
        type="number"
        :rules="[rules.required, rules.milage]"
        label="Поточний пробіг(км)"
      />
    </div>
    <div class="car-form__group">
      <VTextField
        v-model.number.trim="formFields.milagePerMonth"
        type="number"
        :rules="[rules.required, rules.monthlyMilage]"
        label="Приблизний середньомісячний пробіг(км)"
      />
    </div>
    <div class="car-form__group">
      <VSelect
        v-model="formFields.fuelType"
        :items="['Бензин', 'Дизель', 'Газ', 'Газ/бензин', 'Гібрид', 'Електро']"
        :rules="[rules.required]"
        label="Тип палива"
      />
    </div>
    <div class="car-form__group">
      <VTextField
        v-model.number.trim="formFields.engineCapacity"
        type="number"
        :rules="[rules.required, rules.capacity]"
        label="Об'єм двигуна"
      />
    </div>
    <div class="car-form__group">
      <VTextField
        v-model.trim="formFields.carNumber"
        :rules="[rules.required, rules.carNumber]"
        label="Номер авто"
      />
    </div>
    <div class="car-form__group">
      <VTextField
        v-model.trim="formFields.vin"
        :rules="[rules.required, rules.vin]"
        label="VIN код"
      />
    </div>
    <div class="car-form__group">
      <VTextField
        v-model.trim="formFields.image"
        label="Посилання на зображення"
      />
    </div>
    <div class="car-form__controls">
      <BaseButton
        mode="outline-btn"
        type="button"
        @click="cancelForm"
      >
        <slot name="cancel">
          Відмінити
        </slot>
      </BaseButton>
      <BaseButton
        mode="primary-btn"
        type="submit"
      >
        <slot name="submit">
          Зберегти
        </slot>
      </BaseButton>
    </div>
  </VForm>
</template>

<script>
export default {
  props: {
    car: {
      type: Object,
      default: null,
      required: false,
    },
  },
  emits: ['submit-data', 'cancel'],
  data() {
    return {
      formFields: {
        brand: this.car?.brand || '',
        model: this.car?.model || '',
        year: this.car?.year || '',
        currentMilage: this.car?.currentMilage || '',
        milagePerMonth: this.car?.milagePerMonth || '',
        fuelType: this.car?.fuelType || null,
        engineCapacity: this.car?.engineCapacity || '',
        carNumber: this.car?.carNumber || '',
        vin: this.car?.vin || '',
        image: this.car?.image || '',
      },
      rules: {
        required: v => !!v || 'This field is required',
        year: v => (v && v.toString().length === 4) || 'Year must be 4 digits',
        milage: v => (v && v > 0) || 'Milage must be greater than 0',
        monthlyMilage: v => (v && v > 0) || 'Monthly milage must be greater than 0',
        capacity: v => (v && v > 0) || 'Capacity must be greater than 0',
        carNumber: v => (v && v.toString().length === 8) || 'Car number must be 8 characters',
        vin: v => (v && v.length === 17) || 'VIN code must be 17 characters',
      },
    }
  },
  methods: {
    async submitForm() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.$emit('submit-data', this.formFields)
      }
    },
    cancelForm() {
      this.$emit('cancel')
    },
  },

}
</script>

<style lang="scss" scoped>
  .car-form {
    &__group {
      margin-bottom: 10px;
    }
    &__controls {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }
  }
</style>
