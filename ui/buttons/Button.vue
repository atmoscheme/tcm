<template>
  <div class="ui-button">
    <button class="ui-button__push" :disabled="!!props.disabled">
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  disabled: boolean;
}>(
);
</script>

<style scoped lang="scss">
.ui-button {
  &__push {
    cursor: pointer;
  }
}
</style>
