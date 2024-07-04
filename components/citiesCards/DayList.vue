<script setup lang="ts">
const { toCelcium, tranformTime } = useTransform()

const props = defineProps({
  weatherArray: {
    default: () => []
  }
})
</script>

<template>
  <div
      class="day-list"
  >
    <div
        v-for="item in weatherArray"
        class="day-list__item"
    >
          <span>
            {{ tranformTime( item.dt).time }}
          </span>
      <br />
      <span>
            {{ toCelcium(+item.main.temp) + '\u2103' }}
          </span>
    </div>

  </div>
</template>

<style scoped lang="scss">
.day-list{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &__item{
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

</style>