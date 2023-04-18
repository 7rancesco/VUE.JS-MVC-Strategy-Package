<script setup lang="ts">
    import Form from './Form.vue';
    const props = defineProps(['model'])

    const emits = defineEmits(['setData', 'setNewRelation', 'collectionInc', 'collectionDec']);
    function setData( data : Property ){
        emits('setData', data);
    }
    
    function setNewRelation(entity:string, mod: Model[]){
        emits('setNewRelation', entity, mod)
    } 

    function collectionInc(property:string){
        emits('collectionInc', property)
    }

    function collectionDec(property:string, index : number){
        emits('collectionDec', property, index)
    }


</script>

<template>

    <Form 
        :model="props.model"
        @set-data="setData"
        @set-new-relation="setNewRelation"
        @collection-inc="collectionInc"
        @collection-dec="collectionDec"
    />
    
</template>