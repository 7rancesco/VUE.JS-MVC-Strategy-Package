<script setup lang="ts">
    const props = defineProps(['datas'])
</script>

<template>
<h2>Preview</h2>
    <div v-for="data in datas">
        {{ data.label }} : {{ data.value }}
    </div>
</template>