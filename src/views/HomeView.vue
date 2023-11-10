<template>
  <div class="flex h-screen">
    <div class="w-28 bg-gray-800 text-white flex flex-col">
      <div class="px-4 py-2 text-sm font-bold">Welcome {{ authStore.username }}</div>
      <button class="px-4 py-2 mt-2 text-sm text-left hover:bg-gray-700" @click="logout">
        Logout
      </button>
    </div>

    <div class="flex-grow bg-white">
      <FavoritesList></FavoritesList>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import FavoritesList from '@/components/FavoritesList.vue'

export default defineComponent({
  name: 'HomeView',
  components: { FavoritesList },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const logout = () => {
      authStore.logoutUser()
      router.push('/login')
    }

    return { logout, authStore }
  }
})
</script>