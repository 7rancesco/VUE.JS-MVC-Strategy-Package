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
        <div style="background-color: rgba(0, 0, 0, 0.28); padding: 10px 5px 10px 5px; border-radius: 3px; margin-bottom:30px; display: flex; opacity: 0.8;">


            <div v-for="group in navDropdowns">
                <button class="btn btn-light" type="button" @click="showDropdown = showDropdown === group.label ? '' : group.label">
                    {{ group.label }} {{ showDropdown === group.label ? ' x' : ' >' }}
                    <span style="text-decoration: underline;" class="btn-success">
                        {{ View[current ? current : ''].group === group.label ? current : '' }}
                    </span>
                </button>
                <div v-if="showDropdown === group.label" style="margin-top: 0px; padding: 3px; padding-top: 30px; border-top: solid 1px aqua; background-color: black;">
                    <div v-for="model in group.elements" style="text-align: center;">
                        <button
                            class="btn"
                            :class="current === model ? 'btn-success' : 'btn-light'"
                            @click="current = model; showDropdown = '';"
                        > {{ model }}s </button>  
                    </div>
                </div>                   
            </div>

            <div v-for="model in navButtons">

                <button 
                    class="btn" 
                    :class="current === model ? 'btn-success' : 'btn-light'"
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