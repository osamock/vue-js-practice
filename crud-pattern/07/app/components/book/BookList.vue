<template>
  <section>
    <div>
      <router-link :to="{name: 'add'}">Create New Book</router-link>
    </div>
    <input type="search" v-model="searchTitle" placeholder="title">
    <ul v-if="filterBooks">
      <li v-for="{id,title,price} in filterBooks">
        <router-link :to="{name: 'book', params: {book_id: id}}">{{id}}:{{title}}@{{price}}</router-link>
        <router-link :to="{name: 'edit', params: {book_id: id}}">Edit</router-link>
        <router-link :to="{name: 'remove', params: {book_id: id}}">Remove</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('getAsync')
    },
    data() {
      return {
        searchTitle: ''
      }
    },
    computed: {
      filterBooks() {
        const {books} = this.$store.state
        if (books !== null) {
          return Object.values(books).filter(book => book.title.indexOf(this.searchTitle) !== -1)
        }
      }
    }
  }
</script>