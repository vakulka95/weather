<script setup lang="ts">
import type {City, CityData, DayTemperature} from '~/types'
const emit = defineEmits(['changeValue', 'handleClick'])

const props = defineProps({
  value: {
    type: String,
    default: () => '',
  }
})

/**
 * TODO: Отримуємо список міст України
 */
const cities: City[] = await $fetch('/api/cities/ua')

/**
 * TODO: Фильтруємо випадаючий список міст
 */
const filteredCities = computed(() =>
    cities.filter(item =>
        item.city.toLowerCase().includes(props.value.toLowerCase())
    )
);

const { getCityCoordinate, getWeeklyCityTemperature, createOneDayTemperature, filteredWeeklyTemperature } = useCities()
const { toCelcium } = useTransform()
const citiesStore = useCitiesStore()
const { citiesList } = storeToRefs(citiesStore)

const selectCity = async (cityName: string) => {
  /**
   * TODO:Перевіряємо на наявність місто в списку
   */
  const city = citiesList.value.some((el: CityData) => el.city === cityName)
  if(city) {
    citiesStore.setNewPromptStatus('isHave')

    /**
     * TODO: змінюю value для очищення поля
     */
    emit('changeValue')
    return
  }
  /**
   * TODO:Первіряю на довжину списка
   */
  if(citiesList.value.length > 4) {

    /**
     * TODO: відкриваю модалку з попередженням
     */
    openModal()
    /**
     * TODO: змінюю value для очищення поля
     */
    emit('changeValue')
    return
  }


  emit('changeValue', cityName)

  /**
   * TODO:Отримаю всі необхідні дані для погоди в місті
   */
  const data: any = await getCityCoordinate(cityName)
  const temp = toCelcium(data.main.temp)
  const weeklyTemp =  await getWeeklyCityTemperature({lat: data.coord.lat, lon: data.coord.lon})
  const oneDay = await createOneDayTemperature(weeklyTemp.list)
  const week = await filteredWeeklyTemperature(weeklyTemp.list)


  const cityData: CityData = {
    city: cityName,
    lat: data.coord.lat,
    lon: data.coord.lon,
    temp: temp,
    weeklyList: week,
    weather:data.weather[0].main,
    dayliList: oneDay,
  }
  /**
   * TODO:Зберігаю дані в стору
   */
  citiesList.value.push(cityData)
  citiesStore.setCities(citiesList.value)
  emit('handleClick')

  /**
   * TODO: змінюю value для очищення поля
   */
  emit('changeValue')

  /**
   * TODO: Замінюю статус для показу підказки
   */
  citiesStore.setNewPromptStatus('isAdded')
};


const useUser = useUserStore()

function openModal(){
  useUser.setlistFullModal(true)
}


</script>

<template>
  <TransitionGroup
      v-if="value"
      tag="div"
      name="list"
      class="list "
  >
    <u-i-components-ui-select-list-item
        v-for="(item, i) in filteredCities"
        :key="i"
        :city-name="item.city"
    >
      <span
          @click="selectCity(item.city)"
      >
        {{ item.city }}
      </span>
    </u-i-components-ui-select-list-item>
  </TransitionGroup>
</template>

<style scoped lang="scss">
.list{
  position: absolute;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
  background: #fff;

  border-radius: 5px;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #91DEFF;
  }
}
</style>