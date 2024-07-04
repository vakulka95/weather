import { defineStore } from 'pinia';

interface State {
    apiKey: string | null;
    listFullModal: boolean
    isLoader: boolean
}

export const useUserStore = defineStore({
    id: 'user-store',
    state: (): State => ({
        apiKey: null,
        listFullModal: false,
        isLoader: false,
    }),
    persist: {
        storage: persistedState.localStorage,
    },
    actions: {
        setApiKey(newValue: string) {
            this.apiKey = newValue;
        },
        setlistFullModal(newValue: boolean){
            this.listFullModal = newValue
        },
        setIsLoader(newValue){
            this.isLoader = newValue
        }
    },
});