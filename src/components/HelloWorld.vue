<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For further information about this project,<br>
      contact with
      <a href="https://github.com/erencelik" target="_blank" rel="noopener">author</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  margin: 32px auto;
}
a {
  color: #42b983;
}
</style>
