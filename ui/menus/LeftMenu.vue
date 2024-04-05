<template>
  <div
    class="ui-leftmenu"
    :class="{ 'ui-leftmenu__collapsed': isLeftMenuCollapsed }"
  >
    <div class="ui-leftmenu__handler">
      <Icon name="arrow-right" fill="black" @click="toggle" />
    </div>
    <div class="ui-leftmenu__header">
      <slot name="header"></slot>
    </div>
    <div class="ui-leftmenu__body">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/ui/icon/Icon.vue";
const isLeftMenuCollapsed = ref(false);
const toggle = () => {
  isLeftMenuCollapsed.value = !isLeftMenuCollapsed.value;
};
</script>

<style scoped lang="scss">
.ui-leftmenu {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  -webkit-transition: width 0.5s ease-in-out;
  -moz-transition: width 0.5s ease-in-out;
  -o-transition: width 0.5s ease-in-out;
  transition: width 0.5s ease-in-out;
  &__collapsed{
    width: 0;
    .ui-leftmenu__handler {
      transform: rotate(0);
    }
  }

  &__handler {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -20px;
    top: 20px;
    cursor: pointer;
    background-color: aqua;
    height: 40px;
    width: 30px;
    border-radius: 5px;
    transform: rotate(180deg);
  }
  &__header {
    background-color: aqua;
    height: 80px;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 16px 0;
  }
  &__body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: hidden;
    background-color: white;
    height: 100%;
  }
}
</style>
