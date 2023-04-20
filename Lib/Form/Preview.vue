<script setup lang="ts">
    const props = defineProps(['datas'])

    function getLabels(options : {value : number, label : string}[], values : number[]){
        let output : string = '';
        values?.forEach(val => {
            const label = options.find(e => e.value === val);
            if(label){
                output += ` ${label.label} |`
            }
        });
        return output
    }

</script>

<template>
<h2>Preview</h2>
    <div v-for="data in datas">
        {{ data.label }} : {{ data.relation ? getLabels(data.options, data.value) : data.value }}
    </div>
</template>