<script setup lang="ts">
    import { Model } from './Config/Model';
    import { View } from './Config/View';
    import { Controller } from './Config/Controller';

    import { ref, onMounted, watch } from 'vue';

    import Strategy from './Lib/Strategies/Strategy.vue';

    const models = ref<string[]>();
    const current = ref<string>();
    const schema = ref<Schema>();

    onMounted(()=>{
        models.value = Object.keys(Model);
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
                controller : Controller[ current.value ]
            };

        }
    }



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
        <div class="d-flex" style="background-color: black;">

            <div v-for="model in models">

                <button 
                    class="btn" 
                    :class="current === model ? 'btn-outline-light' : 'btn-outline-success'"
                    @click="current = model"
                > {{ model }}s </button>

            </div>

        </div>  
        
        <!--BODY-->
        <div>
            <Strategy :schema="schema" />
        </div> 

    </div>
</template>