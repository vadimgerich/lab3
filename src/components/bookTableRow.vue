// рядок що відбражає 1 лот
<template>
    <tr>        
        <td> {{index}} </td>
        <td> {{lot.title}} </td>
        <td> {{lot.startPrice}} </td>
        <td> {{lot.endPrice}} </td>
        <td> {{new Date(lot.startData).toLocaleDateString()}} </td>
        <td> {{new Date(lot.endData).toLocaleDateString()}} </td>
        <td>
            <input type="button" value="Вилучити" @click="remove(index)">
            <input type="button" value="Редагувати" @click="update(index)">
        </td>        
    </tr>
</template>

<script>
export default {
    name:"lotTableRow",
    props:{
        index:Number,
        lot:Object        
    },
    data(){   
        return{

        }
    },
    methods:{ 
        ...mapActions(["deleteLot", "showUpdateForm"]),
        updated(){
        console.log(this.lot);
        }            
    }
}
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>