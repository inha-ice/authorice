<template>
  <div class="input">
    <label class="input__label" for="signup-name">
      {{ label }}
      <span v-if="required" class="input__required" title="필수">*</span>
    </label>
    <input
      class="input__text"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="input"
    >
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
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
  background-color: transparent;
  border: none;
  border-bottom: 1px #c8c8de solid;
  outline: none;
  transition: border-color 0.5s;
}

.input__text:focus {
  border-color: #4c4cfc;
}

.input__text:disabled {
  color: #b7b7ca;
  border-bottom-color: #d3d3e2;
}

.input__text::placeholder {
  color: #cacad8;
}

.input__required {
  margin-left: -4px;
  color: #4c4cfc;
}
</style>
