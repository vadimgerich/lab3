<template>
  <div id="app">    
    <messageSystem></messageSystem>
    <searchString></searchString>
    <hr>
    <queryForm></queryForm>
    <hr>
    <input type="button" @click="showAddForm" value=" Додати лот" />
    <lotTable></lotTable>
    <lotForm></lotForm>
  </div>
</template>

<script>
import Vue from "vue";
import lotTable from "./components/lotTable";
import lotForm from "./components/lotForm";
import searchString from "./components/searchString";
import queryForm from "./components/queryForm";
import messageSystem from "./components/messageSystem";
import axios from "axios";
import { mapActions } from 'vuex';

export default {
  //назва компоненту, співпадає із назвою файла  
  name: "app",
  //компоненти які використовуються в додатку
  components: {
    lotTable,
    lotForm,
    searchString,
    queryForm,
    messageSystem
  },
  //дані компонента на початку
  data() {
    return {        
    };
  },
  //коли додаток створено то треба завантажити список лотів із сервера 
  mounted() {    
    this.getLots(); 
  },  //методи 
  methods: {
    ...mapActions(["showMessageForTime", "getLots", "showAddForm"]),   
  },
  
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
}
</style>