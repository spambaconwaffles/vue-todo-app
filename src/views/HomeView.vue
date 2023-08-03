<template>
  <div class="home">
    
    
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"

const todo_items = ref([])
const error = ref(null)


onMounted(async () => {
    try {
        let data = await fetch("http://localhost:3000/todoitems")
        if (!data.ok) {
            throw Error("No data available")
        }
        todo_items.value = await data.json()
        // console.log(todo_items.value)
    }
    catch (err) {
        error.value = err.message
        console.log(error.value)
    }
})

</script>
