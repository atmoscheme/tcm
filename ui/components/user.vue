<template>
  <div class="ui-user-card">
    <div class="ui-user-card__info">
      <img :src="user.avatar" alt="" class="ui-user-card__info__img" />
      <div class="ui-user-card__info__detail">
        <p class="ui-user-card__info__detail__name">
          {{ `${user.first_name} ${user.last_name}` }}
        </p>
        <p class="ui-user-card__info__detail__email">
          {{ user.email }}
        </p>
        <RankClicker :rank="user.rank" @click="setRank"></RankClicker>
        <textarea
          class="ui-user-card__info__detail__description"
          v-model="payload.description"
        ></textarea>
      </div>
    </div>
    <div class="ui-user-card__button">
      <Button @click="emit('click:save', payload)">Save</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/types/users";
import RankClicker from "./rankClicker.vue";

interface PayloadType {
  id: number;
  description?: string;
  rank?: number;
}
type Emits = {
  "click:save": [payload: any];
};

const props = defineProps<{
  user: User;
}>();
const emit = defineEmits<Emits>();
const payload = ref();
const setRank = (rank: number = 0) => {
  payload.value.rank = rank;
};
const init = () => {
  payload.value = {
    id: props.user.id,
    description: props.user.description,
    rank: props.user.rank,
  };
};
init();
watch(
  () => props.user.id,
  () => {
    init();
  },
);
</script>

<style scoped lang="scss">
.ui-user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 800px;
  height: 600px;
  border-radius: 30px;
  padding: 32px;
  &__info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-family: Arial;
    &__img {
      border-radius: 20px;
      width: 40%;
      margin-right: 32px;
    }
    &__detail {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 60%;
      height: 100%;
      &__name {
        font-size: 30px;
      }
      &__email {
      }
      &__description {
        margin-top: 16px;
        width: 100%;
        height: 100%;
      }
    }
  }
  &__button {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
