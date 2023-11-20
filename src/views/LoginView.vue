<template>
  <div class="flex h-screen">
    <div class="flex-1 bg-no-repeat bg-right" :style="{ backgroundImage: 'url(' + treeLeft + ')' }"></div>

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
