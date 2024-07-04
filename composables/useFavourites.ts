export const useFavourites = () => {
    const useCities = useCitiesStore()
    const { favouritesCities } = storeToRefs(useCities)
    const useUser = useUserStore()

    function updateFavouriteCityList(name: string | undefined): void{

        const index = favouritesCities.value.findIndex((el: string) => el === name )
        if(index === -1){
            if(favouritesCities.value.length > 4) return useUser.setlistFullModal(true)

            favouritesCities.value.push(name)
            useCities.setFavouritesCities(favouritesCities.value)
        } else {
            const updatedArr = favouritesCities.value
            updatedArr.splice(index, 1)

            useCities.setFavouritesCities(updatedArr)
        }

    }

    return {
        updateFavouriteCityList,
    }
};

