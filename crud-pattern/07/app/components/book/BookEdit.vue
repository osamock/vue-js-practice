<template>
  <section>
    <h2>Edit New Book</h2>
    <form @submit="update" v-if="book">
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
  export default {
    data() {
      const {books} = this.$store.state
      if (books !== null) {
        return {
          book: books[this.$route.params.book_id]
        }
      }
      this.$router.push('/')
    },
    methods: {
      update() {
        this.$store.dispatch('putAsync', this.book)
        this.$router.push('/')
      }
    }
  }
</script>