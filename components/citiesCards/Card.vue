<script setup lang="ts">


const props = defineProps({
  city: {
    default: () => {
    }
  },
  index:{
    type: Number,
    default: () => 0,
  }
})

const list: Ref<string> = ref('today')

function changeList(value: string): void {
  list.value = value
}

const {getWeatherIcon} = useWeatherIcon(props.city.weather[0].main)
</script>

<template>
  <div class="card">
    <div class="card__top">
      <cities-cards-weather-switcher
          @handle-click="changeList"
      />

      <div  v-if="index > 0">
        <cities-cards-remove

            :index="index"
            :city-name="city.city"
        />
        <favourites-favourite-btn
            :city-name="city.city"
        />
      </div>

    </div>

    <div class="card__wrap">
      <div class="city">{{ city.city }}</div>
      <div class="temp">{{ city.temp + '\u2103' }}</div>
      <div class="icon">
        <component :is="getWeatherIcon"/>
      </div>
      <cities-cards-day-list
          v-if="list === 'today'"
          :weatherArray="city.dayliList"
      />
      <div class="week-list"
           v-else
      >
        <div class="time-of-day">
          <div>
            <NuxtImg
                class="icon"
                format="webp"
                src="/images/weather/sun.png"
                alt="sun"
            />
          </div>
          <div>
            <NuxtImg
                class="icon"
                format="webp"
                src="/images/weather/moon.png"
                alt="moon"
            />
          </div>
        </div>

        <cities-cards-day-of-week
            v-for="item in city.weeklyList"
            :data="item"
        />

      </div>
      <chart-component
          v-if="list !== 'today'"
          :list="city.weeklyList"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  border: 1px solid rgba(225, 225, 225, .3);
  background: rgba(225, 225, 225, .3);
  padding: 25px 16px 16px;
  max-width: 550px;
  width: 100%;

  &__top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__wrap {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 20px;

    .icon {
      max-width: 100px;
    }


    .week-list {
      overflow: auto;
      justify-content: space-between;
      width: 100%;
      max-width: 500px;
      display: flex;
      gap: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }

    .time-of-day {
      display: flex;
      flex-direction: column;
      justify-content: end;
      gap: 15px;
    }
  }


  .city {
    font-size: 35px;
    font-weight: 700;
  }

  .temp {
    font-size: 25px;
    font-weight: 600;
  }
}


</style>