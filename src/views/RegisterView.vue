<template>
  <div class="flex h-screen">
    <div class="w-1/2 bg-gray-500"></div>

    <div class="w-1/2 bg-white flex">
      <div class="flex flex-col justify-center w-full">
        <RegisterForm class="w-full max-w-xs ml-0 md:ml-12 lg:ml-24" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegisterForm from '@/components/RegisterForm.vue'

export default defineComponent({
  name: 'RegisterView',
  components: {
    RegisterForm
  }
})
</script>
