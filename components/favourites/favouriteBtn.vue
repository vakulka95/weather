<script setup lang="ts">
const props = defineProps({
  cityName: {
    type: String,
    default: () => ''
  }
})
const useCities = useCitiesStore()
const { updateFavouriteCityList } = useFavourites()

</script>

<template>
<div
    class="favourite-btn"
>
  <svgo-favourites
      @click="updateFavouriteCityList(cityName)"
      class="icon"
      :class="{
        'icon--active': useCities.getDeclineCode(cityName)
      }"
  />
</div>
</template>

<style scoped lang="scss">
.favourite-btn{
  max-width: 30px;

  .icon{
    cursor: pointer;
    &--active{
      fill: #000;
    }
    &:hover{
      fill: cornflowerblue;
    }
  }

}
</style>