<template>
    <ul>
        <li v-for="item in todo_list" :key="item.id">
            <SingleItem :todo_item="item" />
        </li>
    </ul>
</template>


<script setup>
import SingleItem from './SingleItem.vue';

const props = defineProps(['todo_list'])


</script>