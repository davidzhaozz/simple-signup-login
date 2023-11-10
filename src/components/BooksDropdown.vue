<template>
  <div class="flex w-full max-w-xs">
    <select
      id="books-dropdown"
      v-model="selectedBook"
      class="mt-1 block flex-grow pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option disabled value="">Please select a book</option>
      <option v-for="book in books" :key="book.id" :value="book.id">
        {{ book.title }}
      </option>
    </select>

    <button
      class="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-shrink-0 w-48"
      @click="addToFavor"
    >
      Update My Favor
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, inject } from 'vue'
import type { Ref } from 'vue'
import { fetchBooks, addFavorite } from '@/services/apiService'
import { useAuthStore } from '@/stores/auth'

interface Books {
  id: string
  title: string
}

type updateFavor = () => void

export default defineComponent({
  name: 'BooksDropdown',
  setup() {
    const books: Ref<Books[]> = ref([])
    const selectedBook = ref('')
    const authStore = useAuthStore()

    const updateFavor = inject<updateFavor>('updateFavor')

    onMounted(async () => {
      try {
        books.value = await fetchBooks()
      } catch (error) {
        console.error('Error:', error)
      }
    })

    const addBookToFavorites = async (bookId: string) => {
      try {
        await addFavorite(authStore.username, bookId)
        if (updateFavor) {
          updateFavor()
        }
      } catch (error) {
        console.error('Error adding book to favorites:', error)
      }
    }

    const addToFavor = () => {
      addBookToFavorites(selectedBook.value)
    }

    return {
      books,
      selectedBook,
      addToFavor
    }
  }
})
</script>
