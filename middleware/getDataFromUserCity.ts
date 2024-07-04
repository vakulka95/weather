import {useTransform} from "~/composables/useTransform";
export default defineNuxtRouteMiddleware(async (to, from) => {
    if(process.client){

        const userStore = useUserStore()



        const {
            getCityTemperature,
            getWeeklyCityTemperature,
            createOneDayTemperature,
            filteredWeeklyTemperature
        } = useCities()
        const { toCelcium } = useTransform()
        const citiesStore = useCitiesStore()
        const { citiesList } = storeToRefs(citiesStore)

        let cities = [];
        let celsiumTemp;
        let weeklyList;
        let dayliList;

        /**
         * TODO: перевіряємо наявність масиву з обраними містами
         */
        if(citiesList.value.length){
            cities = citiesList.value;
        }

        try{
            /**
             * TODO: Визначаємо місто юзера
             */
            const response = await $fetch('https://ipapi.co/json/')
            if(response){
                cities[0] = {
                    city: response.city,
                    lat: response.latitude,
                    lon: response.longitude,
                }
                /**
                 * TODO: перевіряємо температуру для кожного міста яке ми додавали в основний список
                 */
                for (const [index, city] of cities.entries()) {
                    const resp = await getCityTemperature(city)
                    /**
                     * TODO: Переводжу температуру в Цельсій
                     */
                     celsiumTemp = await toCelcium(resp.main.temp)

                    /**
                     * TODO: Отримаємо температуру на декілька діб вперед
                     */
                    const { list } = await getWeeklyCityTemperature(city)

                    /**
                     * TODO: Отримаємо список температури в продовж дня
                     */

                    dayliList = await createOneDayTemperature(list)
                    /**
                     * TODO: Змінюємо список температури на декілька діб вперед
                     */
                    weeklyList = await filteredWeeklyTemperature(list)
                    cities[index] = {
                        city: city.city,
                        lat: city.lat,
                        lon: city.lon,
                        temp: celsiumTemp,
                        weather: resp.weather,
                        weeklyList,
                        dayliList,
                    }
                }

                /**
                 * TODO: Зберігаємо всі необхідні дані в cookie
                 */

                citiesStore.setCities(cities)

            }

        } catch (err){
            console.error(err);
        }
    }


})