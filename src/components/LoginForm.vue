<template>
  <div class="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
    <div
      v-if="loginError"
      class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span class="block sm:inline">{{ loginErrorMessage }}</span>
      <span
        class="absolute top-0 bottom-0 right-0 px-4 py-3"
        @click="clearError"
        style="cursor: pointer"
      >
        x
      </span>
    </div>

    <h2 class="text-center text-2xl font-bold text-gray-700 mb-8">Login</h2>
    <form @submit.prevent="login">
      <div class="mb-6">
        <label class="block mb-2 text-sm text-gray-600" for="username">Username</label>
        <input
          class="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          id="username"
          type="text"
          v-model="username"
          placeholder="Your username"
          required
        />
      </div>
      <div class="mb-6">
        <label class="block mb-2 text-sm text-gray-600" for="password">Password</label>
        <input
          class="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          id="password"
          type="password"
          v-model="password"
          placeholder="Your password"
          required
        />
      </div>
      <div class="mb-6">
        <button
          class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          type="submit"
        >
          Sign In
        </button>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Don’t have an account yet?
          <button
            class="text-blue-500 focus:outline-none focus:underline hover:underline"
            type="button"
            @click="goToRegister"
          >
            Register
          </button>
        </p>
      </div>
    </form>
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
  }
})
</script>

<style scoped></style>
