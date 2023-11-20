<template>
  <div class="flex h-screen">
    <div class="flex-1 bg-no-repeat bg-right relative" :style="{ backgroundImage: 'url(' + treeLeft + ')' }">
      <div class="fun-facts">
        <h3 class="text-center text-lg font-bold mb-4">Fun Facts</h3>
        <p>
          An interesting aspect of selling books online is the concept of "long tail" sales. This term, popularized in the context of online business, refers to how online book retailers can profit from selling a larger number of unique, less popular items, each in relatively small quantities.
        </p>
        <p>
          In traditional brick-and-mortar bookstores, shelf space is limited, which means they often stock only the most popular titles to ensure sales. However, in the online world, storage and display space are virtually unlimited. This allows online booksellers to offer a vast and diverse range of books, including rare, out-of-print, or niche titles that wouldn't make it to the shelves of a conventional store.
        </p>
        <p>
          This "long tail" approach has revolutionized book selling and buying, as it caters to the diverse interests of readers, allowing them to find books that are very specific to their tastes, something that was much harder to do before the advent of online book selling. It's a fascinating example of how the internet has expanded consumer choice and transformed industries by tapping into diverse, less mainstream market segments
        </p>
      </div>
    </div>

    <div class="flex-1 bg-no-repeat bg-left" :style="{ backgroundImage: 'url(' + treeRight + ')' }">
      <div class="flex items-center justify-center h-full">
        <login-form class="w-full max-w-xs" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import treeLeft from '@/assets/books-of-trees-left.png';
import treeRight from '@/assets/books-of-trees-right.png';

export default defineComponent({
  name: 'LoginView',
  components: {
    LoginForm,
  },
  data() {
    return {
      treeLeft, treeRight
    }
  }
})
</script>

<style scoped>
.fun-facts {
  background-color: rgba(221, 204, 196, 0.7);
  width: 80%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>