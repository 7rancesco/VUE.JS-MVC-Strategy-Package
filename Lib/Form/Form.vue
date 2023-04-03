<script setup lang="ts">
    import Text from './FieldTemplates/Text.vue';
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

        <div v-else style="color: red;">
            Type "{{field['type']}}" for property "{{ field['propertyName'] }}" not found in FieldTemplates
        </div>
    </div>
</template>