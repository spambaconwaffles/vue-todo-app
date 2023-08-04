<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-medium mb-4">About</h1>
    <p>Hello welcome to my Todo web app</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quasi vel voluptatum recusandae quos iusto ducimus
      saepe fuga ab dolorum facilis esse dolores cumque, qui delectus voluptas similique minus quia.</p>

    <div class="h-screen grid content-end justify-items-center	">
      <button @click="toggleMiku">Miku</button>
      <img v-show="showMiku" src="https://media.tenor.com/4mGl-qVGALAAAAAM/miku-anime.gif" alt="miku">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showMiku = ref(false)

const toggleMiku = () => {
  showMiku.value = !showMiku.value
}

</script>
