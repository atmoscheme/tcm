<template>
  <div class="ui-badge">
    <div class="ui-badge__icon">
      <Icon name="arrow-right" fill="blue" />
    </div>
    <div class="ui-badge__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/ui/icon/Icon.vue";
</script>

<style scoped lang="scss">
.ui-badge {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-top: 1px solid #b6b6b6;
  padding: 16px 32px 16px 16px;
  position: relative;
  min-height: 32px;
  cursor: pointer;
  &:hover {
    background-color: #d0d0d0;
  }
  &__icon {
    position: absolute;
    right: 16px;
    top: 50%;
    bottom: 50%;
    margin: auto;
    width: 20px;
    height: 20px;
  }
  &__body {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
