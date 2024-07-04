import type { DayTemperature } from '@/types'
export const useCities = () => {
    const userStore = useUserStore()
    const { apiKey } = storeToRefs(userStore)
    const config = useRuntimeConfig()
    const { toCelcium } = useTransform()

    /**
     * TODO: Метод для отримання даних по IP
     * @param city
     */
    async function getCityCoordinate(city: string){
        try{
           return await $fetch(`weather?q=${city}&appid=${apiKey.value}`, {
                baseURL: config.public.BASE_URL
            })
        } catch( err ){
            console.log(err)
        }
    }

    /**
     * TODO: Отримаємо поточну температуру та погоду
     * @param data
     */
    async function getCityTemperature(data){

        try {
           return await $fetch(`weather?lat=${data.lat}&lon=${data.lon}&appid=${apiKey.value}`, {
                baseURL: config.public.BASE_URL
            })
        } catch(err){
            console.error(err)
        }
    }

    /**
     * TODO: Отримаємо температуру на 5 діб вперед
     * @param data
     */
    async function getWeeklyCityTemperature(data){
        try {
            return await $fetch(`forecast/?lat=${data.lat}&lon=${data.lon}&appid=${apiKey.value}`, {
                baseURL: config.public.BASE_URL
            })
        } catch(err){
            console.error(err)
        }
    }

    /**
     * TODO: Створюємо масив з температури на 1 день (по годинно)
     * @param data
     */
    async function createOneDayTemperature(list: any){
        const now = new Date();

        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        const startOfDayUnix = Math.floor(startOfDay.getTime() / 1000);
        const endOfDayUnix = Math.floor(endOfDay.getTime() / 1000);

        const filterData = list.filter( (item: any) => item.dt >= startOfDayUnix && item.dt <= endOfDayUnix)
        return filterData

    }
    /**
     * TODO: Створюємо масив з температури на 5 діб (щоденно)
     * @param data
     */
    async function filteredWeeklyTemperature(list: any): Array<DayTemperature>{
        const optionsDate: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };

        let dayTemp: number | null = null;
        let nightTemp: number | null = null;
        const weeklyTemperature: Array<DayTemperature> = [];
        const currentDay = new Date()
        /**
         * Беремо поточний день
         */
        const today = currentDay.toLocaleDateString('uk-UA', optionsDate)
        list.forEach( (el: any) => {

            const date = new Date(el.dt * 1000); // Перетворюємо UNIX timestamp на Date
            /**
             * відсіюємо поточний день
             */
            if(today !== date.toLocaleDateString('uk-UA', optionsDate)){
                const timeString = date.toLocaleTimeString('uk-UA');
                /**
                 * Беремо за основу температуру в день - 15:00 і вночі 03:00
                 */
                if(timeString === '03:00:00') nightTemp = toCelcium(el.main.temp)
                if(timeString === '15:00:00') dayTemp = toCelcium(el.main.temp)


                if(nightTemp && dayTemp){
                    weeklyTemperature.push({
                        nightTemp,
                        dayTemp,
                        weather: el.weather,
                        date: date.toLocaleDateString('uk-UA', optionsDate)
                    })
                    nightTemp = null
                    dayTemp = null
                }

            }
        })

        return weeklyTemperature
    }
    return {
        getCityCoordinate,
        getCityTemperature,
        getWeeklyCityTemperature,
        createOneDayTemperature,
        filteredWeeklyTemperature
    }
};

