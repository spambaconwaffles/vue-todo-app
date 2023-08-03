<template>
    <li class="flex mb-4 items-center">
        <p class="w-full text-grey-darkest">{{ snippet }}</p>
        <button
            class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">Done</button>
        <button
            class="flex-no-shrink p-2 ml-2 border-2 rounded text-yellow-500 border-yellow-500 hover:text-white hover:bg-yellow-500">Update</button>
        <button
            class="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Remove</button>
    </li>
</template>


<script setup>

import { computed, defineProps } from 'vue';

const props = defineProps(["todo_item"])

const snippet = computed(() => {
    let itemDesc = props.todo_item.todo_desc

    let cutoffLength = 50

    if (itemDesc.length > cutoffLength) {
        return itemDesc.substring(0, cutoffLength) + "..."
    }

    return itemDesc
})

</script>