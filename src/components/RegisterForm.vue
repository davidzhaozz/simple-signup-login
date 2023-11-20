<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full">
      <h2 class="text-center text-2xl font-bold mb-4 py-2 rounded reg-back">
        Registration
      </h2>
      <form @submit.prevent="register" class="shadow-md rounded px-8 pt-6 pb-8 mb-4 reg-back">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            v-model="username"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">
            Confirm Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            v-model="confirmPassword"
            @input="checkPasswordsMatch"
            required
          />
          <p v-if="passwordMismatch" class="text-red-500 text-xs italic">Passwords do not match.</p>
        </div>
        <div class="flex items-center justify-center space-x-4">
          <button
            class="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline form-button"
            type="submit"
            :disabled="passwordMismatch"
          >
            Register
          </button>
          <button
            class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline form-button"
            type="button"
            @click="goToLogin"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { userCreationService } from '@/services/apiService'
import { useUserStore } from '@/stores/user'

export default defineComponent({
  name: 'RegisterForm',
  setup() {
    const username = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const passwordMismatch = computed(() => password.value !== confirmPassword.value)
    const router = useRouter()
    const userStore = useUserStore()

    const register = async () => {
      if (!passwordMismatch.value) {
        try {
          await userCreationService({
            username: username.value,
            password: password.value
          })

          userStore.setRegistered(true)
          router.push('/login')
        } catch (error) {
          console.error('System Error:', error)
        }
      }
    }

    const checkPasswordsMatch = () => {
      // todo : password matching
    }

    const goToLogin = () => {
      router.push('/login')
    }

    return {
      username,
      password,
      confirmPassword,
      passwordMismatch,
      register,
      checkPasswordsMatch,
      goToLogin
    }
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

</style>
