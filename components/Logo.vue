<template functional>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" :width="props.size">
    <symbol id="piece" viewBox="0 0 80 80">
      <path :fill="props.color" d="M13 47.5L0 40l47.6-27.5v15z" />
      <path :fill="props.color" d="M13 47.5L0 40l47.6-27.5v15z" transform="rotate(240 46.2 40)" />
      <path fill="none" :stroke="props.color" stroke-width="4" d="M80 0v80z" />
    </symbol>
    <use width="72" height="72" x="106" y="56" href="#piece" />
    <use
      width="72"
      height="72"
      x="106"
      y="56"
      transform="rotate(60 96 96)"
      href="#piece"
    />
    <use
      width="72"
      height="72"
      x="106"
      y="56"
      transform="rotate(120 96 96)"
      href="#piece"
    />
    <use
      width="72"
      height="72"
      x="106"
      y="56"
      transform="rotate(180 96 96)"
      href="#piece"
    />
    <use
      width="72"
      height="72"
      x="106"
      y="56"
      transform="rotate(240 96 96)"
      href="#piece"
    />
    <use
      width="72"
      height="72"
      x="106"
      y="56"
      transform="rotate(300 96 96)"
      href="#piece"
    />
  </svg>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    color: {
      type: String,
      default: '#181924'
    },
    size: {
      type: String,
      default: '96px'
    }
  }
}
</script>
