<script setup lang="ts">
const emit = defineEmits(['handleClick'])
const isShown: Ref<string> = ref('today')

function switchWeatherList(value){
  isShown.value = value
  emit('handleClick', value)
}
</script>

<template>
  <div
      class="switcher"
  >
            <span
                @click="switchWeatherList('today')"
                class="btn"
                :class="{'btn--active': isShown === 'today'}"
            >
              Today
            </span>
    /
    <span
        @click="switchWeatherList('5 day')"
        class="btn"
        :class="{'btn--active': isShown === '5 day'}"
    >
              5 days</span>
  </div>
</template>

<style scoped lang="scss">
.switcher{


  .btn{
    cursor: pointer;
    text-decoration: underline;

    &--active{
      pointer-events: none;
      text-decoration: none;
      opacity: .3;
    }
  }
}
</style>