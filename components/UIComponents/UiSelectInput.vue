<script setup lang="ts">

const emit = defineEmits(['handleClick'])


const value = ref('')

function changeValue(val: string){
  value.value = val
}

function onHandleClick(){
  emit('handleClick')
}

</script>

<template>
<div class="text-input">
  <div class="text-input__wrap">

    <input
        class="input"
        type="text"
        placeholder="Select your city"
        v-model="value"
    >
  </div>
  <u-i-components-ui-select-list
      @change-value="changeValue"
      @handle-click="onHandleClick"
      :value="value"
  />

</div>
</template>

<style scoped lang="scss">
.text-input{
  position: relative;
  &__wrap{
    display: flex;
    flex-direction: column;

    .input{
      outline: none;
      border: 2px solid #ccc;
      border-radius: 8px;
      padding: 8px 0 8px 16px;
    }
  }

}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


</style>