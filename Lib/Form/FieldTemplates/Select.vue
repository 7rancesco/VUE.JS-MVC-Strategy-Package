<script setup lang="ts">
    import { watch, ref, onMounted, computed } from 'vue';
    import { getSearch } from '@francescocrupi/search-ts';

    const props = defineProps(['field'])
    const emits = defineEmits(['setData'])

    const data = ref<Property>(props.field);
    const value = ref< number | string >();
    const values = ref< number[] | string[] >();

    function setData(){
        data.value.value = value.value;
        emits('setData', data.value)
    }

    watch(
        () => value.value,
        () => setData()
    )

    onMounted(() => {
        value.value = props.field['value']
    })


    function setMultipleData(){
        data.value.value = values.value;
        emits('setData', data.value)
    }

    watch(
        () => values.value,
        () => setMultipleData()
    )

    onMounted(() => {
        values.value = [];
        if(props.field['value']){
            values.value = props.field['value']
        }
    })  
    
    const searchText = ref <string>('');

    const filteredOptions = computed<{value: any, label : string}[] | void>(() => {
        const filtered = getSearch(
            searchText.value,
            props.field.options,
            ['label']
        );
        return filtered
    })

    function removeSelected(value : any){
        let newValues: any[] = [];
        values.value?.forEach(e => {
            if(e !== value){
                if(newValues)
                newValues.push(e);
            }
        });
        return values.value = newValues
    }

</script>

<template>
    <div>
        <label for="">{{ field.label }}</label>

        <div v-if="field.search">
            <input type="text" v-model="searchText" placeholder="search...">
            <button type="button" v-for="selected in values" @click="removeSelected(selected)">{{ selected }} [x]</button>
        </div>
        
        <select v-if="field.multiple && values !== undefined" v-model="values" multiple>
            <option v-for=" option in filteredOptions " :value="option.value">{{ option.label }}</option>
        </select>

        <select v-else name="" id="" v-model="value">
            <option v-for=" option in field.options " :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>