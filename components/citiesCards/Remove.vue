<script setup lang="ts">



const props = defineProps({
  cityName: {
    type: String,
    default: () => ''
  },
  index: {
    type: Number,
    default: () => 0
  }
})

const isShownModal: Ref<boolean> = ref(false)

function showHideModal() {
  isShownModal.value = !isShownModal.value
}

const citiesStore = useCitiesStore()
const { citiesList } = storeToRefs(citiesStore)

function removeCard(city: string){
  const checkCity = citiesList.value.some( item => item.city === city )
  if(checkCity){
    // citiesList.value.slice(props.index)
    const newArr = [...citiesList.value]
    newArr.splice(props.index, 1)
    citiesStore.setCities(newArr)
  }
  showHideModal()
}
</script>

<template>
  <div>
    <div class="remove"
         @click="showHideModal"
    >
      <svgo-trash/>
    </div>

    <modals-modal
        v-if="isShownModal"
        @on-close="showHideModal"
    >
      <template #header>
        <h2>Are you sure You want to delete a card?</h2>
      </template>
      <div class="answer">
        <span
          @click="removeCard(cityName)"
        >Yes</span>
        <span
          @click="showHideModal"
        >No</span>
      </div>
    </modals-modal>
  </div>

</template>

<style scoped lang="scss">
.remove {
  max-width: 30px;
  cursor: pointer;
}

.answer{
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 30px;

  span{
    cursor: pointer;
    font-weight: 700;
    font-size: 18px;
    padding: 5px;
    border: 1px solid #000;
    border-radius: 5px;
    transition: .2s;

    &:hover{
      transform: scale(1.1);
      transition: .2s;
    }
  }
}
</style>