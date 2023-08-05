<template>
  <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
    <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">

      <div class="mb-4">
        <h1 class="text-xl text-grey-darkest">Update item with id: {{ $route.params.todo_id }}</h1>
        <form @submit.prevent="updateTodo" class="mt-4">
          <input class=" w-full shadow border rounded py-2 px-3 text-grey-darker" v-model="curr_todo" required>
          <div class="flex flex-col md:flex-row md:justify-end  mt-4">
            <router-link :to="{ name: 'home' }"
              class="p-2 mt-3 md:mr-2 border-2 rounded text-center text-yellow-500 border-yellow-500 hover:text-white hover:bg-yellow-500">Exit
              without saving</router-link>
            <button type="submit"
              class="p-2 mt-3 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500">Save &
              Exit</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>



<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toastification"


const route = useRoute()
const router = useRouter()
const toast = useToast()

const error = inject("error")

const curr_todo = ref("")

// Fetch todo item from DB by specified item in route params
// To allow users to see the current value of the todo item
onMounted(async () => {
  try {
    let data = await fetch(`http://localhost:3000/todoitems/${route.params.todo_id}`)
    if (!data.ok) {
      throw Error(f`Failed to fetch item with id: ${route.params.todo_id}`)
    }
    // convert to json to access the data
    const singleTodoData = await data.json()

    // Check if the item actually exists in the DB
    // If it doesn't, redirect to 404 page
    if (singleTodoData.length == 0) {
      router.push("/NotFound")
      throw Error(`Item with id: ${route.params.todo_id} does not exist in database`)
    } 

    // Else if there's data, the input's value will be the item's current
    // value fetched from DB
    curr_todo.value = singleTodoData[0].todo_desc
    console.log("Value fetched: ", curr_todo.value)

  }
  catch (err) {
    error.value = err.message
    console.log(error.value)
    toast.error(`Error: ${error.value}`)

  }
})




// Update db with new todo 
const updateTodo = async () => {
  console.log("Update value: ", curr_todo.value)

  if (curr_todo !== "") {
    try {
      const res = await fetch(`http://localhost:3000/todoitems/${route.params.todo_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // remember to stringify before sending
        body: JSON.stringify({ 'todo_desc': curr_todo.value })
      })

      if (!res.ok) {
        throw Error(`Failed to update item ${route.params.todo_id}`)
      }

      toast.success(`Successfully updated item ${route.params.todo_id}`)

      // redirect back to todo list page
      router.push({ name: 'home' })
    }
    catch (err) {
      error.value = err.message
      console.log(error.value)
      toast.error(`Error: ${error.value}`)

    }
  }
}


</script>