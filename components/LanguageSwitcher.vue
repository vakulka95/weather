<script setup lang="ts">

const lang = ref('UA')
</script>

<template>
  <div class="switcher">
    <span>
      {{ lang }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.switcher{
  cursor: pointer;
  font-weight: 700;
}
</style>