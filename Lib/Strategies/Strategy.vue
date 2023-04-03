<script setup lang="ts">
    import { ref, watch, onMounted } from 'vue';
    import { ModelStrategy } from './ModelStrategy';
    import { ViewStrategy } from './ViewStrategy';
    import { ControllerStrategy } from './ControllerStrategy';
    import { Storage } from './Sorage';
    import Index from '../Templates/Index.vue';

    const props = defineProps(['schema']);

    const showProfiler = ref(false);

    const model = ref<Model[]>();
    const view = ref<View>();
    const controller = ref<Controller>();
    const storage = ref<object[]>();
    const entityName = ref<string>();

    watch(
        () => props.schema,
        () => setSchema()
    )

    function setSchema(){
        model.value = ModelStrategy( props.schema.model );
        view.value = ViewStrategy( props.schema.view );
        controller.value = ControllerStrategy( props.schema.controller );
        storage.value = Storage( props.schema.name ).getDatas();
        entityName.value = props.schema.name;
    }

    onMounted(() => {
        setSchema()
    })

    function setData( data : Property ){
        model.value?.map( e => {
            if( e.propertyName === data.propertyName ){
                return e.value = data.value
            }
        })
    }

    function persist(){
        if(model.value){
            Storage( props.schema.name ).setDatas( model.value )
            setSchema()
        }

    }

    function update( id : number ){
        if(model.value){
            Storage( props.schema.name ).updateDatas( model.value, id )
            setSchema()
        }
    }

    function remove( id : number ){
        if(model.value){
            Storage( props.schema.name ).removeDatas( id )
            setSchema()
        }
    }

</script>

<template>

    <div v-if="showProfiler" style="background: black; color:green;">
        S T R A T E G Y <br>
        Name : {{ entityName }} <br>
        Model : {{ model }} <br>
        View : {{ view }} <br>
        Controller : {{ controller }} <br>
        Storage : {{ storage }}

    </div>

    <Index 
        :storage="storage"
        :model="model"
        :view="view"
        :title="entityName"
        @set-data="setData"
        @persist="persist"
        @update="update"
        @remove="remove"
    />
    
</template>