<script setup lang="ts">
    const props = defineProps(['storage', 'title'])
    const emits = defineEmits(['showForm', 'preview']);
</script>

<template>

    <div class="container">

        <div style="border-bottom: 1px solid black; display: flex; justify-content: space-between;">
            <h2>{{ title }}s</h2>
            <button class="btn btn-success" @click="emits('showForm')">+</button>
        </div>

        <div v-if="props.storage.length">
            <div v-for="data in props.storage"
                @click="emits('preview', data)"
            >
                {{ data }}
            </div>
        </div>
        <div v-else >
            no data
        </div>

    </div>        
</template>