<template>
    <li class="flex mb-4 items-center">
        <p v-show="!showInputBox" class="w-full text-grey-darkest" @dblclick="updateTodo">{{ todo_item.todo_desc }}</p>
        <input v-show="showInputBox" class="w-full" type="text" v-model="updatedItem">
        <button
            class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">Done</button>
        
        <button @click="removeTodo"
            class="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Remove</button>
    </li>
</template>


<script setup>

import { ref, defineProps, inject } from 'vue';

const props = defineProps(["todo_item"])


const error = inject("error")

// Inject todo_list ref from parent component to access
// for delete and update
const todo_list = inject("todo_list")

// remove specific todo item by id
const removeTodo = async () => {
    try {
        const deleteId = props.todo_item.id
        console.log("Deleting ", deleteId)
        
        // remove item from todo_list ref
        todo_list.value = todo_list.value.filter((item) => {
            return item.id !== deleteId
        })

        // Actually delete from db
        const res = await fetch(`http://localhost:3000/todoitems/${deleteId}`, {
            method: "DELETE"
        })

        if (!res.ok) {
            throw Error("Error: Failed to remove item")
        }
    }
    catch (err) {
        error.value = err.message
        console.log(error.value)
    }
}


// update specific item by id
const updatedItem = ref(props.todo_item.todo_desc)
const showInputBox = ref(false)

const updateTodo = () => {
    showInputBox.value = !showInputBox.value
}


</script>