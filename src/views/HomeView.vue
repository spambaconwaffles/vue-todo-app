<template>
  <div class="h-100 w-full items-start  lg:flex lg:flex-row lg:justify-center bg-teal-lightest font-sans">
    <div class="bg-white rounded shadow p-6 mx-0 my-4 lg:mx-4 w-full lg:w-1/2 lg:max-w-2xl">
      <div class="mb-4">
        <h1 class="text-2xl font-bold">Todo List</h1>

        <form @submit.prevent="addNewTodo" class="md:flex mt-4 mb-7">
          <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 mb-4 md:mb-0" placeholder="Add Todo"
            v-model="new_Todo" required>
          <div class="md:flex md:flex-row items-center w-full mb-6 md:mb-0 mr-3">
            <label class="block mb-2 mr-3"  for="doneBy">By:</label>
            <!-- Deadline can be optional -->
            <input class="w-full shadow appearance-none border rounded py-2 px-3" type="date" id="doneBy" :min="minDate"
              v-model="new_doneByDate">
          </div>
          <button type="submit"
            class="w-full md:w-auto  p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500">Add</button>
        </form>
      </div>


      <!-- todo list -->
      <div v-if="todo_list.length">
        <TodoList :todo_list="todo_list_notdone" />
      </div>

    </div>

    <!-- Done list -->
    <div class="bg-white rounded shadow p-6 mx-0 my-4 lg:mx-4 w-full lg:w-1/2 lg:max-w-2xl">

      <div class="mb-4">
        <h1 class="text-2xl mb-7 font-bold">Done List</h1>
        <div v-if="todo_list.length">
          <TodoList :todo_list="todo_list_done" />
        </div>
      </div>

    </div>



  </div>
</template>

<script setup>
import { onMounted, ref, provide, inject, computed } from "vue"
import TodoList from "../components/TodoList.vue"
import { useToast } from "vue-toastification"

// Get error ref
// values will be passed to error when there's an error
const error = inject("error")

const toast = useToast()

// Get current date in yyyy-mm-dd format to set min date input
const minDate = new Date().toISOString().split('T')[0]

// Fetch data and load it to todo_list ref
const todo_list = ref([])
provide("todo_list", todo_list) // make it accessible to SingleItem for delete and update

// create done and not done lists
const todo_list_notdone = computed(() => {
  return todo_list.value.filter((item) => {
    return item.completed === 0
  })
})

const todo_list_done = computed(() => {
  return todo_list.value.filter((item) => {
    return item.completed === 1
  })
})


onMounted(async () => {
  try {
    let data = await fetch("http://localhost:3000/fetchallItems")
    if (!data.ok) {
      throw Error("Failed to fetch todo list data")
    }
    todo_list.value = await data.json()
    console.log(todo_list.value)
  }
  catch (err) {
    error.value = err.message
    console.log(error.value)
    toast.error(`Error: ${error.value}`)
  }
})




// Add new todo item
const new_Todo = ref("")
const new_doneByDate = ref("")

const addNewTodo = async () => {
  if (new_Todo.value !== '') {
    try {
      const res = await fetch("http://localhost:3000/todoitems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // remember to stringify before sending
        body: JSON.stringify({
          'todo_desc': new_Todo.value,
          'doneBy': new_doneByDate.value
        })
      })

      if (!res.ok) {
        throw Error("Failed to add new item")
      }

      // Even if it's POST, need to .json() to get its response
      // response needed to obtain auto-generated id from backend
      const resData = await res.json()

      // id is needed to specify item to update or delete
      todo_list.value.push({ id: resData.insertId, 
        todo_desc: new_Todo.value, 
        doneBy: new_doneByDate.value,
        completed: 0 })
      new_Todo.value = ""
      new_doneByDate.value = ""
      toast.success("Successfully added an item")
    }
    catch (err) {
      error.value = err.message
      console.log(error.value)
      toast.error(`Error: ${error.value}`)
    }
  }
}



</script>
