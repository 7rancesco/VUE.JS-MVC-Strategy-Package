<script setup lang="ts">
    import { watch, ref, onMounted, computed } from 'vue';
    import { getSearch } from '@francescocrupi/search-ts';
    import Form from '../Form.vue';

    const props = defineProps(['field'])
    const emits = defineEmits(['setData', 'setNewRelation'])

    const data = ref<Property>(props.field);
    const value = ref< number | string >();
    const values = ref< (number | string)[] >([]);

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
    const filteredOptions = computed<{value: any, label : string}[] >(() => {
        return getSearch(
            searchText.value,
            props.field.options,
            ['label']
        ) as any
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

    function getLabel(value : number | string) {
        const label = props.field.options.find((e : any) => e.value === value);
        return label.label
    }

    const newRelation = ref<Model>();
    function setRelationData(data : Model){
        newRelation.value = data;
    }

    async function emitDataRelation(){
        emits('setNewRelation', props.field.entity, newRelation.value)
    }

    function pushNewPropDataRelation(){
        const lastInsert = filteredOptions.value[filteredOptions.value.length - 1];
        const isEmpty = values.value?.length === 0;
        if(isEmpty){
            values.value = [lastInsert.value];
        } else {
            let array = values.value;
            values.value = [...array, lastInsert.value];
        }
    }

    function persistNewRelation(){
        addItemStatus.value = false;
        emitDataRelation().then(
            function(){pushNewPropDataRelation()}
        )
    }

    const collectionIndex = ref<number>(0);
    function collectionInc(){
        collectionIndex.value++;
    }
    function collectionDec(){
        collectionIndex.value--;
    }

    const addItemStatus = ref<boolean>(false);

</script>

<template>
    <div>

        <div v-if="field.collection">
            Collection of {{ field.label }} <br>
            <div v-for="i in collectionIndex">
                {{ i }}° - {{ field.label }} <button type="button" @click="collectionDec">x</button>
                <Form 
                    :model="field.relation"
                    @set-data="setRelationData(field.relation)"
                />
            </div>
            <button type="button" @click="collectionInc">Add {{ field.label }}</button>
        </div>
        
        <div v-else>
        
            <label for="">{{ field.label }}</label>

            <div v-if="field.search">
                <input type="text" v-model="searchText" placeholder="search...">
                <button type="button" v-for="selected in values" @click="removeSelected(selected)">{{ getLabel(selected) }} [x]</button>
            </div>
            
            <select v-if="field.multiple && values !== undefined" v-model="values" multiple>
                <option v-for=" option in filteredOptions " :value="option.value">{{ option.label }}</option>
            </select>

            <select v-else name="" id="" v-model="value">
                <option v-for=" option in field.options " :value="option.value">{{ option.label }}</option>
            </select>

            <div v-if="field.buttonAdd">

                <button type="button" @click="addItemStatus = !addItemStatus">
                    {{ addItemStatus ? ' - Hide' : ' + Add' }} new {{ field.label }}
                </button>
                <div v-if="addItemStatus">
                
                    <Form 
                        :model="field.relation"
                        @set-data="setRelationData(field.relation)"
                    />
                    <button type="button" @click="persistNewRelation">Push in {{ field.label }}</button>
                </div>

            </div>

        </div>
    </div>
</template>