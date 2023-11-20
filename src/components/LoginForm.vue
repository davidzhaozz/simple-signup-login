<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full">
      <!-- Error Message -->
      <div v-if="loginError" class="mb-4 bg-red-200 text-red-800 p-1 rounded relative" role="alert">
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline">{{ loginErrorMessage }}</span>
        <span class="absolute top-0 right-0 px-4 py-3" @click="clearError" style="cursor: pointer">x</span>
      </div>

      <div v-if="showRegistrationSuccess" class="text-center font-bold mb-4 py-1 rounded reg-back">
        You have successfully registered! Please log in.
      </div>

      <h2 class="text-center text-2xl font-bold mb-4 py-2 rounded reg-back">
        Login
      </h2>

      <form @submit.prevent="login" class="shadow-md rounded px-8 pt-6 pb-8 mb-4 reg-back">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input v-model="username" type="text" id="username" required placeholder="Enter your username"
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2 custom-login-text" for="password">Password</label>
          <input v-model="password" type="password" id="password" required placeholder="Enter your password"
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div class="mb-4">
          <button type="submit"
                  class="w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline custom-button-sign-in form-button">
            Sign In
          </button>
        </div>

        <p class="text-center text-gray-600 text-sm custom-login-text">
          Don’t have an account?
          <a @click="goToRegister" class="text-white-500 hover:text-white-800 focus:outline-none focus:underline register">Register here</a>
        </p>

      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { userLoginService } from '@/services/apiService'

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const username = ref('')
    const password = ref('')
    const loginError = ref(false)
    const loginErrorMessage = ref('')
    const clearError = () => {
      loginError.value = false
      loginErrorMessage.value = ''
    }

    const authStore = useAuthStore()
    const router = useRouter()

    const login = async () => {
      clearError()

      try {
        await userLoginService({
          username: username.value,
          password: password.value
        })

        authStore.loginUser(username.value)

        router.push('/')
      } catch (error) {
        loginError.value = true
        loginErrorMessage.value = 'Failed to login. Please check your username and password.'
      }
    }

    const goToRegister = () => {
      router.push('/register')
    }

    return {
      username,
      password,
      login,
      goToRegister,
      loginError,
      loginErrorMessage,
      clearError
    }
  },
  props: {
    showRegistrationSuccess: Boolean,
  }
})
</script>

<style scoped>

.reg-back {
  background-color: #fef8cc;
  color: #151f2a;
}

.form-button {
  background-color: #975432;
  color: #ffffff;
}

input {
  background-color: transparent;
  border: 0;
}

input::placeholder {
  color: #e4e1cd;
}

.register {
  cursor: pointer;
}
</style>
