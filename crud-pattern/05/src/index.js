const store = new Vuex.Store({
  state: {
    books: [
      {id: 1, title: 'Math', price: 1000},
      {id: 2, title: 'Science', price: 1200},
      {id: 3, title: 'Chemical', price: 1400}
    ].reduce((a, b) => ({...a, [b.id]: b}), {})
  },
  mutations: {
    add(state, book) {
      const values = Object.values(state.books)
      const id = values[values.length - 1].id + 1
      // state.books = {...state.books, [id]: {...book, id}}
      state.books[id] = {...book, id}
    },
    update(state, book) {
      // state.books = {...state.books, [book.id]: book}
      state.books[book.id] = book
    },
    remove(state, id) {
      delete state.books[id]
    }
  }
})

const BookList = Vue.extend({
  template: '#book-list',
  data() {
    return {searchTitle: ''}
  },
  computed: {
    filterBooks() {
      const {books} = store.state
      return Object.values(books).filter(book => book.title.indexOf(this.searchTitle) !== -1)
    }
  }
})

const Book = Vue.extend({
  template: '#book-ref',
  computed: {
    book() {
      const {books} = store.state
      return books[this.$route.params.book_id]
    }
  }
})

const BookAdd = Vue.extend({
  template: '#book-add',
  data() {
    return {
      book: {title: '', price: ''}
    }
  },
  methods: {
    create() {
      store.commit('add', this.book)
      router.push('/')
    }
  }
})

const BookEdit = Vue.extend({
  template: '#book-edit',
  data() {
    const {books} = store.state
    return {
      book: books[this.$route.params.book_id]
    }
  },
  methods: {
    update() {
      store.commit('update', this.book)
      router.push('/')
    }
  }
})

const BookRemove = Vue.extend({
  template: '#book-remove',
  computed: {
    book() {
      const {books} = store.state
      return books[this.$route.params.book_id]
    }
  },
  methods: {
    remove() {
      store.commit('remove', this.book.id)
      router.push('/')
    }
  }
})

const router = new VueRouter({
  routes: [
    {path: '', component: BookList},
    {path: '/', component: BookList},
    {path: '/books', component: BookList},
    {path: '/books/:book_id', component: Book, name: 'book'},
    {path: '/add-books', component: BookAdd, name: 'add'},
    {path: '/books/:book_id/edit', component: BookEdit, name: 'edit'},
    {path: '/books/:book_id/remove', component: BookRemove, name: 'remove'}
  ]
})

new Vue({
  el: '#app',
  router,
  template: '<router-view></router-view>'
})