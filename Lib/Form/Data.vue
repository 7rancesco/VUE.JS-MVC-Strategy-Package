<script setup lang="ts">
    import Form from './Form.vue';
    const props = defineProps(['model'])

    const emits = defineEmits(['setData', 'setNewRelation']);
    function setData( data : Property ){
        emits('setData', data);
    }
    function setNewRelation(entity:string, mod: Model[]){
        emits('setNewRelation', entity, mod)
    }

</script>

<template>

    <Form 
        :model="props.model"
        @set-data="setData"
        @set-new-relation="setNewRelation"
    />
    
</template>