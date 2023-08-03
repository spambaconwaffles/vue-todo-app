<template>
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">

            <div class="mb-4">
                <h1 class="text-grey-darkest">Update item with id: {{ $route.params.todo_id }}</h1>
                <form  v-if="curr_todo" @submit.prevent="updateTodo" class="mt-4">
                    <input class=" w-full shadow border rounded py-2 px-3 text-grey-darker" v-model="curr_todo">
                    <div class="flex flex-col md:flex-row md:justify-end  mt-4">
                        <router-link :to="{name: 'home'}"
                            class="p-2 mt-3 md:mr-2 border-2 rounded text-center text-yellow-500 border-yellow-500 hover:text-white hover:bg-yellow-500">Exit
                            without saving</router-link>
                        <button type="submit"
                            class="p-2 mt-3 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500">Save &
                            Exit</button>
                    </div>
                </form>
                <p class="mt-4 text-center" v-else>Loading...</p>
            </div>
        </div>

    </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const curr_todo = ref(null)
const error = ref(null)

const route = useRoute()
onMounted(async () => {
  try {
    let data = await fetch(`http://localhost:3000/todoitems/${route.params.todo_id}`)
    if (!data.ok) {
      throw Error("No data available")
    }
    const test = await data.json()
    curr_todo.value = test[0].todo_desc

    console.log("Value fetched: ", curr_todo.value)
  }
  catch (err) {
    error.value = err.message
    console.log(error.value)
  }
})

const updateTodo = () => {
    console.log("Update value: ", curr_todo.value)
}


</script>