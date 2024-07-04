
<template>
  <div
      class="prompt"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.prompt{
  position: fixed;
  right: 30px;
  top: 40px;
  z-index: 100;
  padding: 16px;
  background: #fff;
  border-radius: 10px;
  font-size: 12px;
}
</style>