<template>
  <section>
    <h2>Create New Book</h2>
    <form @submit="create">
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
  export default {
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
  }
</script>