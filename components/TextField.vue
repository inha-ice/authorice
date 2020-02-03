<template>
  <div class="input">
    <label class="input__label" for="signup-name">{{ label }}</label>
    <input
      class="input__text"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="input"
    >
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    input (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
}

.input__label {
  margin: 0.5rem 0;
  color: #181924;
}

.input__text {
  max-width: 656px;
  padding: 0.5rem;
  font-size: 1rem;
  color: #181924;
  border: none;
  border-bottom: 1px #c8c8de solid;
  outline: none;
  transition: border-color 0.5s;
}

.input__text:focus {
  border-color: #4c4cfc;
}
</style>
