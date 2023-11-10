<template>
  <div class="container mx-auto p-4">
    <BooksDropdown style="margin-bottom: 50px" />

    <div v-if="favorites.length === 0" class="text-center">No favor set</div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="favorite in favorites"
          :key="favorite.id"
          class="p-4 border rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 class="font-bold mb-2">{{ favorite.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, provide } from 'vue'
import type { Ref } from 'vue'
import { fetchFavorites } from '@/services/apiService'
import { useAuthStore } from '@/stores/auth'
import BooksDropdown from '@/components/BooksDropdown.vue'

interface Favorite {
  id: string
  title: string
}

export default defineComponent({
  name: 'FavoritesList',
  components: { BooksDropdown },
  setup() {
    const favorites: Ref<Favorite[]> = ref([])
    const authStore = useAuthStore()

    const updateFavor = async () => {
      try {
        favorites.value = await fetchFavorites(authStore.username)
      } catch (error) {
        console.error('Error loading favorites:', error)
      }
    }

    onMounted(async () => {
      updateFavor()
    })

    provide('updateFavor', updateFavor)

    return {
      favorites,
      updateFavor
    }
  }
})
</script>
