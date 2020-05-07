import Vuex from 'vuex';
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        messages: [],
        lots: [],
        searchString: "",
        formVisible: false,
        formLot: {},
        formNewMode: true
    },
    getters: {
        firstMessage(state) {
            return state.messages[0];
        },
        areSomeMessages(state) {
            return state.messages.length > 0;
        },
        messagesCount(state) {
            return state.messages.length
        },
        filtredLots(state) {
            let result = state.lots;
            if (state.searchString)
                result = result.filter(lot =>
                    lot.title.toLowerCase().includes(state.searchString.toLowerCase())
                );
            return result;
        },

    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        },
        removeMessage(state) {
            state.messages.shift();
        },


        setLots(state, lots) {
            state.lots = lots;
        },
        addLot(state, lot) {
            state.lots.push(lot);
        },
        removeLot(state, lot) {
            const index = state.lots.indexOf(lot);
            state.lots.splice(index, 1);
        },
        updateLot(state, lot) {
            const index = state.lots.findIndex(b => b._id == lot._id);
            Vue.set(state.lots, index, lot);
        },
        sortLots(state, field) {
            state.lots.sort((b1, b2) => b1[field] >= b2[field] ? 1 : -1);
        },

        showForm(state) {
            state.formVisible = true;
        },
        hideForm(state) {
            state.formVisible = false;
        },
        newFormMode(state) {
            state.formNewMode = true;
        },
        updateFormMode(state) {
            state.formNewMode = false;
        },

        clearFormLot(state) {
            Object.assign(state.formLot, {
                title: "",
                startPrice:0,
                endPrice: 0,
                startData: "1997-01-10T22:00:00.000Z",
                endData: "1997-01-10T22:00:00.000Z",
            });
        },
        setFormLot(state, lot) {
            state.formLot = lot;
        },
        setSerchString(state, string){
            state.searchString = string;
        }
    },
    actions: {
        async showMessageForTime(context, options) {
            const delay = options.delay || 5000;
            context.commit('addMessage', options.message);
            setTimeout(function () {
                if (context.getters.areSomeMessages)
                    context.commit('removeMessage');
            },
                delay);
        },


        async getLots(context) {
            try {
                let resp = await axios.get("http://localhost:5000/lot");
                context.commit("setLots", resp.data);
                await context.dispatch("showMessageForTime", { message: "Лоти завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async getLotById(context, id) {
            try {
                let resp = await axios.get(`http://localhost:5000/lot/${id}`);
                await context.dispatch("showMessageForTime", { message: "Лоти завантажено", delay: 500 });
                return resp.data;
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async getLotsByQuery(context, query) {
            try {
                let resp = await axios.get("http://localhost:5000/lot", { params: query });
                context.commit("setLots", resp.data);
                await context.dispatch("showMessageForTime", { message: "Лоти завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }

        },
        async postLot(context, lot) {
            try {
                let resp = await axios.post("http://localhost:5000/lot", lot);
                context.commit("addLot", resp.data);
                await context.dispatch("showMessageForTime", { message: "Лот додано", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async deleteLot(context, lot) {
            try {
                let resp = await axios.delete(`http://localhost:5000/lot/${lot._id}`);
                context.commit("removeLot", resp.data);
                await context.dispatch("showMessageForTime", { message: "Лот вилучено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async patchLot(context, lot) {
            try {
                let resp = await axios.patch(`http://localhost:5000/lot/${lot._id}`, lot);
                context.commit("updateLot", resp.data);
                await context.dispatch("showMessageForTime", { message: "Лот оновлено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async showUpdateForm(context, lot) {
            lot = await context.dispatch("getLotById", lot._id);
            context.commit("setFormLot", lot);
            context.commit("updateFormMode");
            context.commit("showForm");
        },
        showAddForm(context) {
            context.commit("clearFormLot");
            context.commit("newFormMode");
            context.commit("showForm");
        }
    }
});
export default store;
