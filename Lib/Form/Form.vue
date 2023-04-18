<script setup lang="ts">
    import Text from './FieldTemplates/Text.vue';
    import Number from './FieldTemplates/Number.vue';
    import Select from './FieldTemplates/Select.vue';

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
    
    <div v-for="field in model">

        <Text 
            v-if="field['type'] === 'text'" 
            :field="field" 
            @set-data="setData"
        />

        <Number 
            v-else-if="field['type'] === 'number'" 
            :field="field" 
            @set-data="setData" 
        />

        <Select 
            v-else-if="field['type'] === 'select' || field['type'] === 'choice'" 
            :field="field" 
            @set-data="setData" 
            @set-new-relation="setNewRelation"
            @collection-inc="collectionInc"
            @collection-dec="collectionDec"
        />

        <div v-else style="color: red;">
            Type "{{field['type']}}" for property "{{ field['propertyName'] }}" not found in FieldTemplates
        </div>
    </div>
</template>