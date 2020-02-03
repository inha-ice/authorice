<template>
  <div class="checkbox">
    <input class="checkbox__box" type="checkbox" :value="value" @click="toggle">
    <slot class="checkbox__text" />
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle (event) {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style scoped>
.checkbox {
  margin: 0.25rem 0;
}

.checkbox__text {
  color: #181924;
}
</style>
