<template>
    <li class="flex mb-4 items-center">
        <p class="w-full text-grey-darkest truncate ...">{{ snippet }}</p>
        <!-- <button
            class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">Done</button> -->
        <router-link :to="`/item/${todo_item.id}`"
            class="flex-no-shrink p-2 ml-2 border-2 rounded text-yellow-500 border-yellow-500 hover:text-white hover:bg-yellow-500">Update</router-link>
        <button @click="removeTodo"
            class="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Remove</button>
    </li>
</template>


<script setup>

import { ref, computed, defineProps, inject } from 'vue';

const props = defineProps(["todo_item"])


const error = inject("error")

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

    }
    catch (err) {
        error.value = err.message
        console.log(error.value)
    }
}


</script>