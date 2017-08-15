<template>
  <section>
    <h2>Edit New Book</h2>
    <form v-on:submit="update" v-if="book">
      <p>
        <input v-model="book.title" placeholder="title" required>
      </p>
      <p>
        <input v-model="book.price" placeholder="price" required type="number">
      </p>
      <button>Update</button>
      <router-link :to="{name: '/'}">Cancel</router-link>
    </form>
  </section>
</template>

<script>
  import Vue from 'vue'
  import store from '../../store'

  const BookEdit = Vue.extend({
    data() {
      const {books} = store.state
      if (books !== null) {
        return {
          book: books[this.$route.params.book_id]
        }
      }
      this.$router.push('/')
    },
    methods: {
      update() {
        store.dispatch('putAsync', this.book)
        this.$router.push('/')
      }
    }
  })

  export default BookEdit
</script>