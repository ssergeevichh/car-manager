<template>
  <BaseCard>
    <section class="auth">
      <div class="title">
        Авторизація
      </div>
      <VForm
        class="auth-form"
        fast-fail
        @submit.prevent="submitForm"
      >
        <div class="auth-form__group">
          <VTextField
            v-model.trim="email"
            :rules="[rules.required, rules.email]"
            label="Email"
          />
        </div>
        <div class="auth-form__group">
          <VTextField
            v-model.trim="password"
            label="Пароль"
            :rules="[rules.required, rules.password]"
            type="password"
          />
        </div>
        <div v-if="!isLoginMode" class="auth-form__group">
          <VTextField
            v-model.trim="confirmPassword"
            label="Підтвердження паролю"
            :rules="[rules.required, rules.password, rules.passwordMatch]"
            type="password"
          />
        </div>
        <div class="auth-form__controls">
          <BaseButton
            type="button"
            mode="outline-btn"
            @click="switchMode"
          >
            {{ switchModeButtonCaption }}
          </BaseButton>
          <BaseButton>
            {{ submitButtonCaption }}
          </BaseButton>
        </div>
      </VForm>
    </section>
  </BaseCard>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,
      mode: 'login',
      email: '',
      password: '',
      confirmPassword: '',
      rules: {
        required: value => !!value || 'Це поле обов`язкове.',
        email: value => /.+@.+\..+/.test(value) || 'E-mail повинен бути дійсним.',
        password: value => value.length >= 6 || 'Пароль повинен бути не менше 6 символів.',
        passwordMatch: value => value === this.password || 'Паролі не співпадають.',
      },
    }
  },
  computed: {
    isLoginMode() {
      return this.mode === 'login'
    },
    submitButtonCaption() {
      return this.mode === 'login' ? 'Увійти' : 'Зареєструватися'
    },
    switchModeButtonCaption() {
      return this.mode === 'login' ? 'Зареєструватися' : 'Увійти'
    },
    userId() {
      return this.$store.getters.userId
    },
  },
  methods: {
    async submitForm() {
      this.validate()
      if (this.isLoginMode && this.formIsValid) {
        try {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          })
          this.$router.push({
            name: 'CarsList',
            params: { id: this.userId },
          })
        }
        catch (error) {
          console.error(error)
        }
      }
      else if (!this.isLoginMode && this.formIsValid) {
        try {
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          })
          this.$router.push({
            name: 'CarsList',
            params: { id: this.userId },
          })
        }
        catch (error) {
          console.error(error)
        }
      }
    },

    validate() {
      this.formIsValid = true
      const emailRegex = /.+@.+\..+/

      if (this.mode === 'login') {
        if (this.email === '' || !emailRegex.test(this.email) || this.password === '' || this.password.length < 6) {
          this.formIsValid = false
        }
      }
      else if (this.mode === 'signup') {
        if (this.email === '' || !emailRegex.test(this.email) || this.password === '' || this.password.length < 6 || this.confirmPassword === '' || this.confirmPassword.length < 6 || this.password !== this.confirmPassword) {
          this.formIsValid = false
        }
      }
    },

    switchMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login'
    },
  },
}
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.03);
}

.auth-form {
  &__controls {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
  }
  &__group {
    margin-bottom: 10px;
  }
}
</style>
