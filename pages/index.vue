<script setup lang="ts">
const userStore = useUserStore()
const { isLoader } = storeToRefs(userStore)
import PromptComponent from "~/components/PromptComponent.vue";

definePageMeta({
  middleware: [ 'init-api-key', 'get-data-from-user-city']
})
const citiesStore = useCitiesStore()
const { promptStatus } = storeToRefs(citiesStore)

const getPromptText = computed(() => {
  if(promptStatus.value === 'isAdded') return "This city has been added to list"
  if(promptStatus.value === 'isHave') return "You have added this city earlier"
})

function clearStatus(){
  setTimeout(() => {
    citiesStore.setNewPromptStatus('')
  }, 3500)
}

/**
 * TODO: Замінюю статус для показу підказки
 */
watch(
    () => promptStatus.value,
    () => {
      if (promptStatus.value) {
        clearStatus()
      }
    }
)

</script>

<template>
  <main>
    <div class="container">
      <div class="content">
        <Transition name="fade">
          <prompt-component
              v-if="promptStatus"
          >
        <span
            :class="{
              'success': promptStatus === 'isAdded',
              'error': promptStatus === 'isHave',

            }"
        >
          {{getPromptText}}
        </span>
          </prompt-component>
        </Transition>
        <div class="content__top">
          <city-finder />

          <div class="right">
            <language-switcher class="switcher"/>
            <favourites />
          </div>

        </div>


<!--        <common-loader />-->
        <cities-cards-list />

      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.content{
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 50px;
  position: relative;
  .right{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  &__top{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__middle{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.success{
  color: green;
}
.error{
  color: red;
}

</style>