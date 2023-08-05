<template>
    <li class="flex mb-4 items-center">
        <p class="w-full truncate ...">{{ snippet }}</p>
        <p class="w-full" v-show="todo_item.doneBy !== ''">By: {{ todo_item.doneBy }}</p>
        <button @click="toggleCompleted"
            class="p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">Done</button>
        <router-link :to="`/item/${todo_item.id}`"
            class="p-2 ml-2 border-2 rounded text-yellow-500 border-yellow-500 hover:text-white hover:bg-yellow-500">Update</router-link>
        <button @click="removeTodo"
            class="p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Remove</button>
    </li>
</template>


<script setup>

import { computed, defineProps, inject } from 'vue';
import { useToast } from "vue-toastification"

const props = defineProps(["todo_item"])


const error = inject("error")
const toast = useToast()

// If length of todo item is over a specified number,
// only the first few characters will be shown
let cutoffLength = 70
const snippet = computed(() => {
    let itemDesc = props.todo_item.todo_desc
    if (itemDesc.length > cutoffLength) {
        return itemDesc.substring(0, cutoffLength) + "..."
    }
    return itemDesc
})



// Inject todo_list ref from parent component to access
// for delete and update
const todo_list = inject("todo_list")

// toggle completed state for the item by id
const toggleCompleted = async () => {
    try {

        // First find the item in todo_list ref and toggle its completed propety
        todo_list.value.forEach((item) => {
            if (item.id === props.todo_item.id) {
                item.completed = Number(!Boolean(item.completed))

                console.log(item)
            }
        })



        // const res = await fetch(`http://localhost:3000/updateCompletedState/${route.params.todo_id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     // remember to stringify before sending
        //     body: JSON.stringify({
        //         'completed': curr_todo.value
        //     })
        // })

        // if (!res.ok) {
        //     throw Error(`Failed to toggle item ${props.todo_item.id}`)
        // }

        // toast.success(`Successfully toggled item ${props.todo_item.id}`)

    }
    catch (err) {
        error.value = err.message
        console.log(error.value)
        toast.error(`Error: ${error.value}`)

    }
}


// remove specific todo item by id
const removeTodo = async () => {
    try {
        const deleteId = props.todo_item.id
        console.log("Deleting ", deleteId)

        // Actually delete from db
        const res = await fetch(`http://localhost:3000/todoitems/${deleteId}`, {
            method: "DELETE"
        })

        if (!res.ok) {
            throw Error("Failed to remove item")
        }

        // remove item from todo_list ref only when item successfully deleted in
        // backend
        todo_list.value = todo_list.value.filter((item) => {
            return item.id !== deleteId
        })
        toast.success(`Successfully deleted item ${deleteId}`)

    }
    catch (err) {
        error.value = err.message
        console.log(error.value)
        toast.error(`Error: ${error.value}`)
    }
}


</script>