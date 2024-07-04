<script setup lang="ts">
const props = defineProps({
  cityName: {
    type: String
  }
})
</script>

<template>
      <div
          class="item"
      >
       <slot />
        <favourites-favourite-btn
          :city-name="cityName"
        />
      </div>
</template>

<style scoped lang="scss">
.item{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  &:hover{
    background: #ccc;
  }
}
</style>