import { defineStore } from 'pinia';
import type { CityData } from '@/types'

interface State {
    citiesList: Array<CityData>
    favouritesCities: Array<string>
    promptStatus: string
}
export const useCitiesStore = defineStore({
    id: 'cities-store',
    state: (): State => ({
        citiesList: [],
        favouritesCities: [],
        promptStatus: '',
    }),
    persist: {
        storage: persistedState.localStorage,
    },
    actions: {
        setCities(cities: Array<CityData>){
            this.citiesList = cities
        },
        setFavouritesCities(cities: Array<string>){
            this.favouritesCities = cities
        },
        setNewPromptStatus(status: string){
            this.promptStatus = status
        }
    },
    getters: {
        getDeclineCode: state => (city: string) => {
            return state.favouritesCities.includes(city)
        },
    },
});