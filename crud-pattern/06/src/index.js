const BookAPI = {
  get: () =>
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => books.reduce((a, b) => ({...a, [b.id]: b}), {}))
  ,
  post: book =>
    fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(book)
    })
  ,
  put: book =>
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(book)
    })
  ,
  remove: id =>
    fetch(`http://localhost:3000/books/${id}`, {
      method: 'DELETE'
    })
}

const store = new Vuex.Store({
  state: {
    books: {}
  },
  mutations: {
    set (state, books) {
      state.books = books
    }
  },
  actions: {
    getAsync(context) {
      BookAPI.get().then(books => context.commit('set', books))
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

const BookList = Vue.extend({
  template: '#book-list',
  data() {
    return {searchTitle: ''}
  },
  created() {
    this.$store.dispatch('getAsync')
  },
  computed: {
    filterBooks() {
      const {books} = this.$store.state
      return Object.values(books).filter(book => book.title.indexOf(this.searchTitle) !== -1)
    }
  }
})

const Book = Vue.extend({
  template: '#book-ref',
  computed: {
    book() {
      const {books} = this.$store.state
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
      this.$store.dispatch('postAsync', this.book)
      this.$router.push('/')
    }
  }
})

const BookEdit = Vue.extend({
  template: '#book-edit',
  data() {
    const {books} = this.$store.state
    return {
      book: books[this.$route.params.book_id]
    }
  },
  methods: {
    update() {
      this.$store.dispatch('putAsync', this.book)
      this.$router.push('/')
    }
  }
})

const BookRemove = Vue.extend({
  template: '#book-remove',
  computed: {
    book() {
      const {books} = this.$store.state
      return books[this.$route.params.book_id]
    }
  },
  methods: {
    remove() {
      this.$store.dispatch('removeAsync', this.book.id)
      this.$router.push('/')
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
  template: '<router-view></router-view>',
  router,
  store
})