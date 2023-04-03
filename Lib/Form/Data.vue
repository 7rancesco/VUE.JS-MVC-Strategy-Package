<script setup lang="ts">
    import Form from './Form.vue';
    const props = defineProps(['model'])

    const emits = defineEmits(['setData']);
    function setData( data : Property ){
        emits('setData', data);
    }

</script>

<template>

    <Form 
        :model="props.model"
        @set-data="setData"
    />
    
</template>