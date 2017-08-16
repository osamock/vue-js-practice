import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.config.devtools = true
Vue.use(VueRouter)

import BookList from './components/book/BookList.vue'
import Book from './components/book/Book.vue'
import BookAdd from './components/book/BookAdd.vue'
import BookEdit from './components/book/BookEdit.vue'
import BookRemove from './components/book/BookRemove.vue'

import store from './store'

const router = new VueRouter({
  routes: [
    {path: '/', component: BookList},
    {path: '/books/:book_id', component: Book, name: 'book'},
    {path: '/add-books', component: BookAdd, name: 'add'},
    {path: '/books/:book_id', component: BookEdit, name: 'edit'},
    {path: '/books/:book_id', component: BookRemove, name: 'remove'}
  ]
})

new Vue({
  el:'#app',
  router,
  store,
  template:'<router-view></router-view>'
})
