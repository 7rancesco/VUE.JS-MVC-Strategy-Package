<script setup lang="ts">
    import { ref, watch, onMounted } from 'vue';
    import { ModelStrategy } from './ModelStrategy';
    import { ViewStrategy } from './ViewStrategy';
    import { ControllerStrategy } from './ControllerStrategy';
    import { Storage } from './Sorage';
    import Index from '../Templates/Index.vue';

    const props = defineProps(['schema']);

    /**+++++++++++++++++++++++++++++++**/
    const showProfiler = ref(true); /**/
    /**+++++++++++++++++++++++++++++**/

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
        model.value = ModelStrategy( props.schema );
        view.value = ViewStrategy( props.schema.view );
        controller.value = ControllerStrategy( props.schema.controller );
        storage.value = Storage( props.schema.name ).getDatas();
        entityName.value = props.schema.name;
    }

    onMounted(() => {
        setSchema()
    })

    function setData( data : Data ){
        model.value?.map( ( e : Data ) => {
            if( e.propertyName === data.propertyName ){
                return e.value = data.value
            }
        })
    }

    function persist(){
        if(model.value){
            const isCollection = model.value.find(e => e.relation);
            if(isCollection){
                model.value.forEach(e => {
                    if( e.relation && e.collection ){
                        let values : number[] = [];
                        e.relation.forEach(r => {
                            if(r){
                                Storage( e.entity as unknown as string ).setDatas( r as Model[])
                                const id = localStorage.getItem('MVCS_ID');
                                if(id)
                                values.push(parseInt(id))
                            }
                        });
                        e.value = values;
                    }
                });
                Storage( props.schema.name ).setDatas( model.value )
            } else {
                Storage( props.schema.name ).setDatas( model.value )
            }
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

    function setNewRelation(entity:string, mod: Model[]){
        Storage( entity ).setDatas( mod )

        if(model.value){
            const currentModel : Model[] = model.value;
            model.value = ModelStrategy( props.schema );
            model.value?.forEach(element => {
                const property = currentModel.find(e => e.propertyName === element.propertyName);
                if(property){
                    element['value'] = property.value;
                    element['relation'] = property.relation;
                }
            });
        }
    }

    function collectionInc(propertyName : string){
        model.value?.forEach(element => {
            const property = element['propertyName'] as unknown as string;
            const entity = element['entity'] as unknown as string;
            if(entity && property === propertyName ){
                const relation = props.schema.allModels[entity];
                const s = {...props.schema};
                s.model = relation;
                const n = ModelStrategy(s);
                if(n)
                element['relation']?.push(n)
            }
        });
    }

    function collectionDec(propertyName : string, index : number){
        model.value?.forEach(element => {
            const property = element['propertyName'] as unknown as string;
            if(property === propertyName ){
                const newElements = element['relation']?.map((e, i) => {
                    if(i !== index){
                        return e
                    }
                })
                if(newElements !== undefined){
                    element['relation'] = newElements as object[];
                }
            }
        });
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
        @set-new-relation="setNewRelation"
        @collection-inc="collectionInc"
        @collection-dec="collectionDec"
    />
    
</template>