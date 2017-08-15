<template>
  <section>
    <form v-on:submit="remove" v-if="book">
      <h2>Delete {{book.title}}</h2>
      <button>Remove</button>
      <router-link :to="{name: '/'}">Cancel</router-link>
    </form>
  </section>
</template>

<script>
  import Vue from 'vue'
  import store from '../../store'

  const BookRemove = Vue.extend({
    computed: {
      book() {
        const {books} = store.state
        if (books !== null) {
          return books[this.$route.params.book_id]
        }
        this.$router.push('/')
      }
    },
    methods: {
      remove() {
        store.dispatch('removeAsync', this.book.id)
        this.$router.push('/')
      }
    }
  })

  export default BookRemove
</script>