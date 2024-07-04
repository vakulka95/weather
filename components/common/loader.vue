<script setup lang="ts">

</script>

<template>
  <div class="loader">
    <div class="loader__img">
      <NuxtImg
          format="webp"
          src="/images/loader_sun.png"
          alt="Loader"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.loader{
  height: 100vh;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;
  &__img{
    animation: spin 2s linear infinite;
    max-width: 300px;

  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>