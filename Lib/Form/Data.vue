<script setup lang="ts">
    import Form from './Form.vue';
    const props = defineProps(['model'])

    const emits = defineEmits(['setData', 'setNewRelation', 'collectionInc', 'collectionDec', 'editCollection']);
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

    function editCollectionData(data : Property, index : string){
        emits('editCollection', data, index)
    } 

</script>

<template>

    <Form 
        :model="props.model"
        @set-data="setData"
        @set-new-relation="setNewRelation"
        @collection-inc="collectionInc"
        @collection-dec="collectionDec"
        @edit-collection="editCollectionData"
    />
    
</template>