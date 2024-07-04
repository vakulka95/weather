<script setup lang="ts">
import Chart from 'chart.js/auto';

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const chartCanvas = ref(null);

const getDayTemp = computed(() => {
  return props.list.map((el: any) => {
    return {x: el.date, y: el.dayTemp}
  })
})
const getNightTemp = computed(() => {
  return props.list.map((el: any) => {
    return {x: el.date, y: el.nightTemp}
  })
})


onMounted(() => {
  // console.log(getChartArr.value)
  const chart = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      datasets: [{
        data: getDayTemp.value,
        label: 'Temperature at day'
      },
        {
          data: getNightTemp.value,
          label: 'Temperature at night'
        }]
    }
  })
});
</script>

<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<style scoped lang="scss">

</style>