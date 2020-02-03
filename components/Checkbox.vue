<template>
  <div class="checkbox">
    <input class="checkbox__box" type="checkbox" :checked="value" :value="value" @click="toggle">
    <slot class="checkbox__text" />
    <span v-if="required" class="checkbox__required" title="필수">*</span>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    required: {
      type: Boolean,
      default: false
    },
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
  margin: 0.5rem 0;
}

.checkbox__text {
  color: #181924;
}

.checkbox__required {
  margin-left: -4px;
  color: #4c4cfc;
}
</style>
