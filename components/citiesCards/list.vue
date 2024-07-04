<script setup lang="ts">
const citiesStore = useCitiesStore()
const { citiesList } = storeToRefs(citiesStore)

</script>

<template>
  <template>
    <div class="slider-container">
      <div class="slider-wrapper" >
        <cities-cards-card
            class="slide"
            v-for="(city, index) in citiesList"
            :key="index"
            :city="city"
            :index="index"
        />

        <cities-cards-add-card
            v-if="citiesList.length < 5"
        />
      </div>
    </div>
  </template>




</template>

<style scoped lang="scss">
.slider-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  margin: auto;
}

.slider-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  transition: transform 0.5s ease-in-out;
}





</style>