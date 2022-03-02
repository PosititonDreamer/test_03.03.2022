<template>
  <button @click="$emit('click')">{{buttonText}}</button>
</template>
<script>
export default {
  props: ['buttonText'],
}
</script>