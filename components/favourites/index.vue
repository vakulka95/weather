<script setup lang="ts">
const useCities = useCitiesStore()
const { favouritesCities } = storeToRefs(useCities)

const isShownList: Ref<boolean> = ref(false)


function openFavouritesList(){
  isShownList.value = !isShownList.value
}

</script>

<template>
  <div
      class="favourites"
  >
    <div
        class="favourites__icon"
        @click="openFavouritesList"
    >
      <svgo-favourites class="icon"/>
      <span
          v-if="favouritesCities.length"
          class="count">{{favouritesCities.length}}</span>
    </div>
    <div
        v-if="isShownList"
        class="favourites__list">
      <ul class="list">
        <favourites-item
            v-for="item in favouritesCities"
            :city="item"
        >
          {{ item }}
        </favourites-item>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.favourites{
  position: relative;
  &__icon{
    max-width: 30px;
    position: relative;
  .icon{
    fill: #000;
  }

    .count{
      position: absolute;
      bottom: -5px;
      right: 0;
      padding: 3px 7px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
  }
  &__list{
    min-width: 100px;
    position: absolute;
    border-radius: 10px;
    background: #fff;
    z-index: 100;
    left: -150px;
  }
}



</style>