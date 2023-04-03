<script setup lang="ts">
    import { watch, ref, onMounted } from 'vue';
    const props = defineProps(['field'])
    const emits = defineEmits(['setData'])

    const data = ref<Property>(props.field);
    const value = ref< number | string >();

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

</script>

<template>
    <div>
        <label for="">{{ field.label }}</label>
        <select name="" id="" v-model="value">
            <option v-for=" option in field.options " :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>