<script setup lang="ts">
    import { Model } from './Config/Model';
    import { View } from './Config/View';
    import { Controller } from './Config/Controller';

    import { ref, onMounted, watch } from 'vue';

    import Strategy from './Lib/Strategies/Strategy.vue';

    const models = ref<string[]>();
    const current = ref<string>();
    const schema = ref<Schema>();

    const navButtons = ref<string[]>([]);
    const navDropdowns = ref<{label:string, elements: string[]}[]>([]);
    onMounted(()=>{
        models.value = Object.keys(Model);
        const viewKeys = Object.keys(View);
        viewKeys.forEach(v => {

            if(View[v].hideNavigation){
                models.value = models.value?.filter(e => e !== v);
            }
        });

        models.value.forEach(element => {
            if(!View[element].group){
                navButtons.value.push(element);
            } else {
                const group = navDropdowns.value.find(e => e.label === View[element].group);
                if(group){
                    //group initialized
                    group.elements.push(element);
                } else {
                    //init new group
                    const groupName = View[element].group+'';
                    const newGroup = {
                        label : groupName,
                        elements : [element]
                    };
                    navDropdowns.value.push(newGroup)
                }
            }
        });

        if(models.value.length){
            current.value = models.value[0];
        }
    })

    watch(
        () => current.value,
        () => setSchema()
    )

    function setSchema() {
        if(current.value){

            schema.value = {
                name : current.value,
                model : Model[ current.value ],
                view : View[ current.value ],
                controller : Controller[ current.value ],
                allModels : Model
            };

        }
    }


    const showDropdown = ref<string>();
</script>

<template>
    <div v-if="!models?.length">
        <h1>Welcome!</h1>
        <p>
            First step: Configure your models in MVCS/Config/Model.ts
        </p>
    </div>

    <div v-else>

        <!--HEADER-->
        <div style="background-color: black; text-align:center; color:white; margin-bottom:-10px; z-index: -1;">
            <h1>MVCS</h1>
        </div>

        <div class="d-flex" style="background-color: black; padding: 10px 5px 10px 5px; margin-bottom:30px;">


            <div v-for="group in navDropdowns">
                <button class="btn btn-success" type="button" @click="showDropdown = showDropdown === group.label ? '' : group.label">
                    {{ group.label }} {{ showDropdown === group.label ? ' x' : ' v' }}
                    <span style="text-decoration: underline;">
                        {{ View[current ? current : ''].group === group.label ? current : '' }}
                    </span>
                </button>
                <div v-if="showDropdown === group.label" style="margin-top:10px; padding: 3px; border: solid 1px green;">
                    <button v-for="model in group.elements"
                        class="btn" 
                        :class="current === model ? 'btn-outline-light' : 'btn-outline-success'"
                        @click="current = model; showDropdown = '';"
                    > {{ model }}s </button>                     
                </div>                   
            </div>

            <div v-for="model in navButtons">

                <button 
                    class="btn" 
                    :class="current === model ? 'btn-outline-light' : 'btn-outline-success'"
                    @click="current = model; showDropdown = '';"
                > {{ model }}s </button>

            </div>

        </div>  
        
        <!--BODY-->
        <div>
            <Strategy :schema="schema" />
        </div> 

    </div>
</template>