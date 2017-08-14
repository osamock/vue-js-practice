let books = [
  {id: 1, title: 'Math', price: 1000},
  {id: 2, title: 'Science', price: 1200},
  {id: 3, title: 'Chemical', price: 1400}
].reduce((a, b) => ({...a, [b.id]: b}), {})

const BookList = Vue.extend({
  template: '#book-list',
  data() {
    return {books, searchTitle: ''}
  },
  computed: {
    filterBooks() {
      return Object.values(this.books).filter(book => book.title.indexOf(this.searchTitle) !== -1)
    }
  }
})

const Book = Vue.extend({
  template: '#book-ref',
  data() {
    return {
      book: books[this.$route.params.book_id]
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
      const id = Object.values(books)[Object.values(books).length - 1].id + 1
      const {title, price} = this.book
      books[id] = {
        id, title, price
      }
      router.push('/')
    }
  }
})

const BookEdit = Vue.extend({
  template: '#book-edit',
  data() {
    return {
      book: books[this.$route.params.book_id]
    }
  },
  methods: {
    update() {
      const book = this.book
      books = {...books, [book.id]: {...book}}
      router.push('/')
    }
  }
})

const BookRemove = Vue.extend({
  template: '#book-remove',
  data() {
    return {
      book: books[this.$route.params.book_id]
    }
  },
  methods: {
    remove() {
      delete books[this.book.id]
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