<script setup lang="ts">
import type {CityData} from "~/types";

const {updateFavouriteCityList} = useFavourites()

const props = defineProps({
  city: {
    type: String,
  }
})


const { getCityCoordinate, getWeeklyCityTemperature, createOneDayTemperature, filteredWeeklyTemperature } = useCities()
const { toCelcium } = useTransform()
const citiesStore = useCitiesStore()
const { citiesList } = storeToRefs(citiesStore)

async function addToMainList(){
  /**
   * TODO:Отримаю всі необхідні дані для погоди в місті
   */
  const data: any = await getCityCoordinate(props.city)
  const temp = toCelcium(data.main.temp)
  const weeklyTemp =  await getWeeklyCityTemperature({lat: data.coord.lat, lon: data.coord.lon})
  const oneDay = await createOneDayTemperature(weeklyTemp.list)
  const week = await filteredWeeklyTemperature(weeklyTemp.list)

  const cityData: CityData = {
    city: props.city,
    lat: data.coord.lat,
    lon: data.coord.lon,
    temp: temp,
    weeklyList: week,
    weather: data.weather[0].main,
    dayliList: oneDay,
  }
  /**
   * TODO:Зберігаю дані в стору
   */
  citiesList.value.push(cityData)
  citiesStore.setCities(citiesList.value)
}
</script>

<template>
  <li
      class="item"
  >
    <slot/>
    <div class="item__wrap">
      <span
          @click="addToMainList"
          class="add"
      >
        <svgo-list-add class="add-to-list"/>
      </span>
      <span
          @click="updateFavouriteCityList(city)"
          class="remove">
        <svgo-plus class="plus"/>
      </span>
    </div>
  </li>
</template>

<style scoped lang="scss">
.item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  gap: 10px;

  &:hover{
    background: #ccc;
    border-radius: 10px;

  }

  &__wrap{
    display: flex;
    gap: 5px;
    align-items: center;

  }


  .plus{
    transform: rotate(45deg);
    width: 15px;
    cursor: pointer;
    margin-top: 5px;
  }
  .add{
    cursor: pointer;
    margin-top: 5px;
  }
  .add-to-list{

    width: 15px;
  }
}
</style>