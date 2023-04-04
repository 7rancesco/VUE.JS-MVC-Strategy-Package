<script setup lang="ts">
    import Text from './FieldTemplates/Text.vue';
    import Number from './FieldTemplates/Number.vue';
    import Select from './FieldTemplates/Select.vue';

    const props = defineProps(['model'])

    const emits = defineEmits(['setData']);
    function setData( data : Property ){
        emits('setData', data);
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
        />

        <div v-else style="color: red;">
            Type "{{field['type']}}" for property "{{ field['propertyName'] }}" not found in FieldTemplates
        </div>
    </div>
</template>