<template>
  <div class="flex h-screen">
    <div class="flex-1 bg-no-repeat bg-right" :style="{ backgroundImage: 'url(' + treeLeft + ')' }"></div>

    <div class="flex-1 bg-no-repeat bg-left" :style="{ backgroundImage: 'url(' + treeRight + ')' }">
      <div class="flex items-center justify-center h-full">
        <RegisterForm class="w-full max-w-xs" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegisterForm from '@/components/RegisterForm.vue'
import treeLeft from '@/assets/books-of-trees-left.png';
import treeRight from '@/assets/books-of-trees-right.png';

export default defineComponent({
  name: 'RegisterView',
  components: {
    RegisterForm,
  },
  data() {
    return {
      treeLeft, treeRight
    }
  }
})
</script>
