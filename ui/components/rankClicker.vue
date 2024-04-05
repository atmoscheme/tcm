<template>
  <div class="ui-rank-clicker">
    <Button @click="minus">-</Button>
    <span class="ui-rank-clicker__rank">{{ rank }}{{ " points" }}</span>
    <Button @click="plus">+</Button>
  </div>
</template>

<script setup lang="ts">
type Emits = {
  click: [rank: number];
};

const props = defineProps<{
  rank?: number;
}>();
const emit = defineEmits<Emits>();
const rank = ref<number>(0);
const minus = () => {
  if (rank.value > 0) {
    rank.value = rank.value - 1;
    emit("click", rank.value);
  }
};
const plus = () => {
  rank.value = rank.value + 1;
  emit("click", rank.value);
};
const init = () => {
  rank.value = props.rank || 0;
};
watch(
  () => props.rank,
  () => {
    init();
  },
);
init();
</script>

<style scoped lang="scss">
.ui-rank-clicker {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background-color: #b9b9b9;
  height: 60px;
}
</style>
