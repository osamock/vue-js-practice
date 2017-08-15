<template>
  <section>
    <h2>Create New Book</h2>
    <form v-on:submit="create">
      <p>
        <input v-model="book.title" placeholder="title" required>
      </p>
      <p>
        <input v-model="book.price" placeholder="price" required type="number">
      </p>
      <button>Create</button>
      <router-link :to="{name: '/'}">Cancel</router-link>
    </form>
  </section>
</template>

<script>
  import Vue from 'vue'
  import store from '../../store'

  const BookAdd = Vue.extend({
    data() {
      return {
        book: {title: '', price: ''}
      }
    },
    methods: {
      create() {
        store.dispatch('postAsync', this.book)
        this.$router.push('/')
      }
    }
  })

  export default BookAdd
</script>