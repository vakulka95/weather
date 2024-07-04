<script setup lang="ts">

const emit = defineEmits(['onClose']);

const props = defineProps({
  isClickOutside: {
    type: Boolean,
    default: true,
  },
  isClose: {
    type: Boolean,
    default: true,
  },
});

const onClosePopup = () => {
  emit('onClose');
};

const clickOutside = (value: any) => {
  if (!props.isClickOutside) {
    return;
  }

  emit('onClose');
};
</script>

<template>
  <teleport to="body">
    <Transition name="fadePopup" appear @touchstart.stop>
      <div
          class="background"
          @click="clickOutside"
      >
        <div
            class="modal"
            @click.stop
        >
          <div
              v-if="isClose"
              class="modal__close"
              @click="onClosePopup"
          >
            <svgo-plus class="icon" />
          </div>
          <div class="modal__content">
            <div class="header">
              <slot name="header" />
            </div>
            <div
                :class="['main', { '!pt-0': $slots.header }]"
            >
              <slot />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped lang="scss">
.fadePopup-enter-active,
.fadePopup-leave-active {
  transition: opacity 0.1s ease;
}

.fadePopup-enter-from,
.fadePopup-leave-to {
  opacity: 0;
}

.background {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6); /* bg-custom-black-200/60 */
  z-index: 9999; /* z-max */
  padding-left: 0.5rem; /* px-2 */
  padding-right: 0.5rem; /* px-2 */

  @media (min-width: 768px) {
    padding-left: 0;
    padding-right: 0; /* md:px-0 */
  }
}

.modal {
  position: relative;
  margin: auto;
  background-color: #ffffff; /* bg-white */
  border-radius: 15px; /* rounded-[15px] */
  border: 1px solid #a3a3a3; /* border-custom-gray-600 */
  width: fit-content; /* w-fit */
  padding: 16px;
}

.modal__close {
  transform: rotate(45deg);
  width: 25px;
  height: 25px;



  position: absolute;
  right: 0;
  top: -23px; /* -top-[17px] */

  cursor: pointer;
  box-sizing: content-box;
  color: #ffffff; /* text-white */
}

.modal__content {
  max-height: 92vh; /* max-h-[92vh] */
}

.header {
  border-top-left-radius: 14px; /* rounded-t-[14px] */
  border-top-right-radius: 14px; /* rounded-t-[14px] */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.main {
  overflow-y: auto;
  padding-left: 15px; /* px-[15px] */
  padding-right: 15px; /* px-[15px] */
  padding-bottom: 30px; /* pb-[30px] */
  padding-top: 2.5rem; /* pt-10 */

  @media (min-width: 768px) {
    padding-left: 30px; /* md:px-[30px] */
    padding-right: 30px; /* md:px-[30px] */
    padding-top: 30px; /* md:pt-[30px] */
    padding-bottom: 2.5rem; /* md:pb-10 */
  }

  max-height: 92vh; /* max-h-[92vh] */
}

//.main.!pt-0 {
//  padding-top: 0 !important;
//}

.icon {
  width: 100%; /* w-full */
  height: 100%; /* h-full */
}
</style>


