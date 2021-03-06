const books = [
  {id: 1, title: 'Math', price: 1000},
  {id: 2, title: 'Science', price: 1200},
  {id: 3, title: 'Chemical', price: 1400}
]

new Vue({
  el: '#app',
  template: '#book-list',
  data() {
    return {books, searchTitle: ''}
  },
  computed: {
    filterBooks() {
      return this.books.filter(book => book.title.indexOf(this.searchTitle) !== -1)
    }
  }
})
