export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()
    const { apiKey } = storeToRefs(userStore)
    if(process.client){
        if(apiKey.value) return

        userStore.setApiKey('8cbb309c5a6c75a6dbd527a9b3ec3f83')
    }
})