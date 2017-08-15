import Vue from 'vue'
import Vuex from 'vuex'
import * as BookAPI from '../api/BookAPI'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    books: null
  },

  mutations: {
    set(state, books){
      state.books = books
    }
  },

  actions: {
    getAsync(context) {
      BookAPI.get().then(books=>context.commit('set', books))
    },
    postAsync(context, book) {
      BookAPI.post(book).then(() => context.dispatch('getAsync'))
    },
    putAsync(context, book) {
      BookAPI.put(book).then(() => context.dispatch('getAsync'))
    },
    removeAsync(context, id) {
      BookAPI.remove(id).then(() => context.dispatch('getAsync'))
    }
  }
})

export default store