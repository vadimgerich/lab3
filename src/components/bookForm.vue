// Форма для відображення лоту
<template>
    <form v-if="visible" @submit.prevent> <!-- якщо форма видима то показати її і відмінити надсилання запиту за замовчуванням-->
        <label> Назва лоту <input type="text" v-model="lot.title" required> </label> <br>
        <label> Стартова ціна <input type="number" v-model="lot.startPrice" min="0" step="10"> </label> <br>
        <label> Кінцева ціна <input type="number" v-model="lot.endPrice" min="10" step="10"> </label> <br>
        <label> Початок торгу <input type="date" v-model="lot.startData"> </label> <br>
        <label> Кінець торгу <input type="date" v-model="lot.endData"> </label> <br>  
        <input type="button" @click="save()" value="Зберегти">     
    </form>
</template>

<script>
import setInput from "./setInput";

export default {
    name: "lotForm",
    props:{
        //передача значення в props через value і генерування події input необхідне для коректної роботи v-model компонента
        value: Object,
        visible: Boolean
    },
    data(){a
        return{
            lot:this.value,            
        }
    },
    components:{
        setInput
    },
    methods:{
        save(){
            this.$emit('input', this.lot);         
        }
    }
}
</script>
<style scoped>
    form{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white ;
    }
</style>