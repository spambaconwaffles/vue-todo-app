<template>
  <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">

    <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">


      <div class="mb-4">
        <h1 class="text-grey-darkest">Todo List</h1>

        <form @submit.prevent="addNewTodo" class="flex mt-4">
          <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Add Todo" v-model="new_Todo">
          <button type="submit"
            class="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500">Add</button>
        </form>
      </div>


      <!-- todo list -->
      <div v-if="todo_list.length">
        <TodoList :todo_list="todo_list" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, provide } from "vue"
import TodoList from "../components/TodoList.vue"


// Fetch data and load it to todo_list ref
const todo_list = ref([])
provide("todo_list", todo_list) // make it accessible to SingleItem for delete and update

const error = ref(null)
provide("error", error)

onMounted(async () => {
  try {
    let data = await fetch("http://localhost:3000/todoitems")
    if (!data.ok) {
      throw Error("No data available")
    }
    todo_list.value = await data.json()
    console.log(todo_list.value)
  }
  catch (err) {
    error.value = err.message
    console.log(error.value)
  }
})




// Add new todo item
const new_Todo = ref("")

const addNewTodo = async () => {
  if (new_Todo.value !== '') {
    try {
      const res = await fetch("http://localhost:3000/todoitems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // remember to stringify before sending
        body: JSON.stringify({ 'todo_item': new_Todo.value })
      })

      if (!res.ok) {
        throw Error("No data available")
      }

      // Even if it's POST, need to .json() to get its response
      // response needed to obtain auto-generated id from backend
      const resData = await res.json()

      // id is needed to specify item to update or delete
      todo_list.value.push({ id: resData.insertId, todo_desc: new_Todo.value })
      new_Todo.value = ""
    }
    catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }
}



</script>
