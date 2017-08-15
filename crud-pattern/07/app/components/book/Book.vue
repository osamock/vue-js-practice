<template>
  <section>
    <div v-if="book">
      <h2>{{book.title}}</h2>
      <h4>価格：{{book.price}}</h4>
      <router-link :to="{name: '/'}">Back to Book List</router-link>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  import store from '../../store'

  const Book = Vue.extend({
    computed: {
      book() {
        const {books} = store.state
        if (books !== null) {
          return books[this.$route.params.book_id]
        }
        this.$router.push('/')
      }
    }
  })

  export default Book
</script>