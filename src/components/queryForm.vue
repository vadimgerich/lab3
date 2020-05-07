//форма для запитів
<template>
    <form @submit.prevent>
        Лоти в період з <input type="date" v-model="query.startData"> до <input type="date" v-model="query.endData"> 
        <input type="button" value="Шукати" @click="search()">
        <input type="button" value="Очистити" @click="reset()">
    </form>
</template>
<script>
import { mapActions } from 'vuex';
export default { 
     data(){
        return{
            query:this.value
        }
    },
    methods:{
        ...mapActions(["getLotsByQuery"]),
         reset(){
            this.query.startData = this.query.endData;
            this.$emit("input",this.query);
        },
        search(){            
            this.$emit("input",this.query);
        }
    }
}
</script>