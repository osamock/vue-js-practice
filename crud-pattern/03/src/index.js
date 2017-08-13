const books = [
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

const router = new VueRouter({
  routes: [
    {path: '', component: BookList},
    {path: '/', component: BookList},
    {path: '/books', component: BookList},
    {path: '/books/:book_id', component: Book, name: 'book'}
  ]
})

new Vue({
  el: '#app',
  router,
  template: '<router-view></router-view>'
})