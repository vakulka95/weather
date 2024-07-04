interface Icons {
    Clear: string,
    Clouds: string,
    Atmosphere: string,
    Drizzle: string,
    Rain: string,
    Snow: string,
    Thunderstorm: string,
}

import Clear from '@/assets/icons/weather/Clear.svg?component'
import Clouds from '@/assets/icons/weather/Clouds.svg?component'
import Atmosphere from '@/assets/icons/weather/Atmosphere.svg?component'
import Drizzle from '@/assets/icons/weather/Drizzle.svg?component'
import Rain from '@/assets/icons/weather/Rain.svg?component'
import Snow from '@/assets/icons/weather/Snow.svg?component'
import Thunderstorm from '@/assets/icons/weather/Thunderstorm.svg?component'


export const useWeatherIcon = (value: string) => {
    /**
     * TODO: Метод для встановлення потрібної іконки погоди
     * @param value
     */
    const getWeatherIcon = computed(() => {
        const icons: Icons = {
            Clear,
            Clouds,
            Atmosphere,
            Drizzle,
            Rain,
            Snow,
            Thunderstorm,
        };

        return icons[value];
    });

    return {
        getWeatherIcon,
    };
};