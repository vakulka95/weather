<script setup lang="ts">
const isShownModal: Ref<boolean> = ref(false)

function showHideModal() {
  isShownModal.value = !isShownModal.value
}


</script>

<template>
  <div
      class="card"
      @click="showHideModal"
  >
    <div class="plus">
      <svgo-plus/>
    </div>

    <modals-modal
        v-if="isShownModal"
        @on-close="showHideModal"
    >
      <div class="modal-wrap">
        <h2>Choose you city</h2>
        <u-i-components-ui-select-input
          @handleClick="showHideModal"
        />
      </div>

    </modals-modal>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  border: 1px solid rgba(225, 225, 225, .3);
  background: rgba(225, 225, 225, .3);
  padding: 16px;
  max-width: 550px;
  width: 100%;
  cursor: pointer;


  .plus {
    display: flex;
    align-items: center;
    max-height: 300px;
    font-size: 400px;
    color: rgba(225, 225, 225, .8);
    transition: .3s linear;
    transform: scale(1);
    &:hover{
      transition: .3s linear;
      transform: scale(1.1);

    }
  }
}

.modal-wrap{
  max-width: 500px;
  height: 400px;
  overflow: hidden;
}
</style>