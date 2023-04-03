<script setup lang="ts">
    import { watch, ref } from 'vue';
    import DataTable from './DataTable.vue';
    import Data from '../Form/Data.vue';
    import Preview from '../Form/Preview.vue';

    const props = defineProps([
        'storage',
        'model',
        'view',
        'title'
    ])

    function setIndex(){
        strg.value = props.storage;
        mdl.value = props.model;
        template.value = props.view['indexTemplate'];
        showIndex();
    }

    watch(
        () => props.model,
        () => setIndex()
    )

    const strg = ref(props.storage);
    const mdl = ref(props.model);
    const template = ref<string>();

    const emits = defineEmits(['setData', 'persist', 'update', 'remove']);

    function setData( data : Property ){
        emits('setData', data);
    }

    function submit( e : Event ){
        e.preventDefault();
        if(currentId.value === null){
            emits('persist')
        } else {
            emits('update', currentId.value)
        }
    }
    
    function remove(){
        const conf = confirm('Sei sicuro di voler rimuovere ' + props.title + ' id ' + currentId.value + ' definitivamente?');
        if(conf)
        emits('remove', currentId.value );
    }


    const templateSelected = ref<string>('index');
    function showForm(){
        templateSelected.value = 'form';
    }
    function showIndex(){
        currentId.value = null;
        if(props.model){
            props.model.forEach((element: Property) => {
                element.value = null;
                setData( element )
            });
        }      

        templateSelected.value = 'index';
    }
    function showPreview( data : Model ){
        if(data['id']){
            currentId.value = data['id'] as number;

            if(props.model){
                props.model.forEach((element: Property) => {
                    if(element.propertyName){
                        element.value = data[element.propertyName];
                        setData( element )
                    }
                });
            } 

            templateSelected.value = 'preview';
        } else {
            alert('ID not found')
        }
    }
    const currentId = ref<number | null>(0);

    
</script>

<template>

    <div v-if="templateSelected === 'index'">
        <DataTable
            v-if="template === 'DataTable'"
            :storage="strg"
            :title="title"
            @show-form="showForm"
            @preview="showPreview"
        />        

        <div v-else style="color: red;">
            <h2>
                IndexTemplate not found for "{{ template }}"
            </h2>
        </div>

    </div>        

    <div v-if="templateSelected === 'form'">
        <button @click="showIndex()">X</button>
        <form @submit="(e) => submit(e) ">

            <Data 
                :model="mdl"
                @set-data="setData"
            />

            <button type="submit">Save</button>
        </form>

    </div>   
    
    <div v-if="templateSelected === 'preview'">
        <button @click="showIndex()">X</button>
        ID : {{ currentId }}
        <Preview :datas="mdl" />

        <button @click="showForm()">Edit</button>
        <button @click="remove()">Remove</button>
    </div>

</template>