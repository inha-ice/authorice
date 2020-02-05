<template>
  <button class="button" @click="click">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'OutlineButton',
  methods: {
    click (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped>
.button {
  display: block;
  padding: 0.8rem 1rem;

  /* margin: 2rem; */
  font-size: 1rem;
  color: #434391;
  background-color: transparent;
  border: 1px #434391 solid;
  outline: none;
  transition: color 0.5s, border-color 0.5s;
}

.button:hover {
  color: #4c4cfc;
  border-color: #4c4cfc;
}
</style>
