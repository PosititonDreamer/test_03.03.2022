import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        people: []
    },
    mutations: {
        updateData(state, data) {
            state.people = data
        },
        addPeopleData(state, data) {
            state.people.push(data)
        },
        updatePeopleData(state, data) {
            state.people = state.people.map(item => {
                if (item.uuid == data.uuid) {
                    item = data;
                }
                return item
            })
        },
        detelePeopleData(state, id) {
            state.people = state.people.filter(item=>item.uuid != id)
        }
    },
    actions: {
        async fetchData(ctx) {
            axios
                .get(`http://localhost:3123/`)
                .then(response => {
                    ctx.commit('updateData', response.data)
                })
        },
        addPeople(ctx, data) {
            return axios
                .post(`http://localhost:3123/`, data)
                .then(response => {
                    ctx.commit('addPeopleData', response.data)
                    return true
                })
                .catch(error => {
                    console.log(error)
                    return false
                })


        },
        updatePeople(ctx, data) {
            let updateData = {'firstName': data.firstName, 'secondName': data.secondName}
            return  axios
                .put(`http://localhost:3123/` + data.uuid, updateData)
                .then(response => {
                    ctx.commit('updatePeopleData', response.data)
                    return true
                })
                .catch(error => {
                    console.log(error)
                    return false
                })
        },
        deletePeople(ctx, id) {
            return axios
                .delete(`http://localhost:3123/` + id)
                .then(response=> {
                    ctx.commit('detelePeopleData', id)
                    return true
                })
                .catch(error=> {
                    console.log(error)
                    return false
                })
        }
    },
    getters: {
        returnData(state) {
            return state.people
        }
    },
    modules: {}
})
