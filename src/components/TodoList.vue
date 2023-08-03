<template>
    <ul v-for="item in todo_list" :key="item.id">
        <SingleItem :todo_item="item" />
    </ul>
</template>


<script setup>
import { defineProps } from 'vue';
import SingleItem from './SingleItem.vue';

const props = defineProps(['todo_list'])


</script>