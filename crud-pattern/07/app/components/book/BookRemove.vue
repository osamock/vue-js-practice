<template>
  <section>
    <form @submit="remove" v-if="book">
      <h2>Delete {{book.title}}</h2>
      <button>Remove</button>
      <router-link :to="{name: '/'}">Cancel</router-link>
    </form>
  </section>
</template>

<script>
  export default {
    computed: {
      book() {
        const {books} = this.$store.state
        if (books !== null) {
          return books[this.$route.params.book_id]
        }
        this.$router.push('/')
      }
    },
    methods: {
      remove() {
        this.$store.dispatch('removeAsync', this.book.id)
        this.$router.push('/')
      }
    }
  }
</script>