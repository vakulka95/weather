export interface City{
    admin_name: string,
    capital: string,
    city: string,
    country: string,
    iso2: string,
    lat: string,
    lng: string,
    population: string,
    population_proper: string

}

export interface CityData{
    city: string,
    lat: string,
    lon: string,
    temp: number,
    weather: Array<any>,
    weeklyList: Array<DayTemperature>,
    dayliList: Array<any>,
}

export interface DayTemperature{
    date: string,
    nightTemp: number | string,
    dayTemp: number | string,
}