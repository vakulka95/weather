<script lang="ts" setup>
const useUser = useUserStore()
const { listFullModal } = storeToRefs(useUser)

function closeModal(){
  useUser.setlistFullModal(false)
}
</script>
<template>
  <div class="wrap">
    <common-header />
    <slot />
    <modals-modal
        v-if="listFullModal"
        @on-close="closeModal"
    >
      <h2>Your country list is full! 5 is maximum</h2>
      <span>Remove some cards from your list</span>
    </modals-modal>
  </div>
</template>

<style lang="scss" scoped>
.wrap{
  min-height: 100vh;
  background: #47b7e4;
}
</style>