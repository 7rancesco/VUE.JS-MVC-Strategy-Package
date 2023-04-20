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
        () => props.title,
        () => setIndex()
    )

    function refreshModel(){
        mdl.value = props.model
    }

    watch(
        () => props.model,
        () => refreshModel()
    )

    const strg = ref(props.storage);
    const mdl = ref(props.model);
    const template = ref<string>();

    const emits = defineEmits(['setData', 'persist', 'update', 'remove', 'setNewRelation', 'collectionInc', 'collectionDec', 'editCollection']);

    function setData( data : Property ){
        emits('setData', data);
    }

    async function submitData(){
        if(currentId.value === null){
            emits('persist')
        } else {
            emits('update', currentId.value)
        }
    }

    async function submitRemoveData(){
        emits('remove', currentId.value );
    }

    function submit( e : Event ){
        e.preventDefault();
        submitData().then(
            function(){setIndex()}
        )
    }
    
    function remove(){
        const conf = confirm('Sei sicuro di voler rimuovere ' + props.title + ' id ' + currentId.value + ' definitivamente?');
        if(conf)
        submitRemoveData().then(
            function(){setIndex()}
        )
    }


    const templateSelected = ref<string>('index');
    function showForm(){
        templateSelected.value = 'form';
    }
    function showIndex(){
        currentId.value = null;
        if(props.model){
            props.model.forEach((element: Property | any) => {
                element.value = null;
                setData( element )
                if(element['collection']){
                    element['relation'] = [element['relation'][0]];
                }
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
                @set-new-relation="setNewRelation"
                @collection-inc="collectionInc"
                @collection-dec="collectionDec"
                @edit-collection="editCollectionData"
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