<script setup lang="ts">
const props = defineProps({
  data: {
    default: () => []
  }
})

const { getWeatherIcon } = useWeatherIcon(props.data.weather[0].main)

</script>

<template>

    <div
        class="day"
    >
      <span>{{ data.date }}</span>
      <div >
        <div class="time-of-day">
          <component class="icon" :is="getWeatherIcon" />

          {{ data.dayTemp + '\u2103' }}
        </div>
        <div class="time-of-day">
          <component class="icon" :is="getWeatherIcon" />

          {{ data.nightTemp + '\u2103'}}
        </div>
      </div>
    </div>

</template>

<style scoped lang="scss">

  .day{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    .time-of-day{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;


      .icon{
        max-width: 20px;
      }
    }
  }


</style>