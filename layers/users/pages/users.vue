<template>
  <BaseLayout>
    <LeftMenu>
      <template #header>
        <div class="users-menu__header">
          <div class="users-menu__header__buttons">
            <Button :disabled="!isRatingEnabled" @click="switchRating(false)"
              >Clients</Button
            >
            <Button :disabled="isRatingEnabled" @click="switchRating(true)"
              >Rating</Button
            >
          </div>
          <div class="users-menu__header__input">
            <input v-model="search" />
          </div>
        </div>
      </template>
      <template>
        <div class="users-menu__body">
          <div
            class="users-menu__badge"
            v-for="user in sortedUsers"
            @click="setUserId(user.id)"
          >
            <Badge>
              <span class="users-menu__badge__icon" v-if="isRatingEnabled">{{
                user.rank
              }}</span>
              <img
                v-else
                class="users-menu__badge__icon"
                :src="user.avatar"
                alt=""
              />
              <span class="users-menu__badge__name">{{
                `${user.first_name} ${user.last_name}`
              }}</span>
            </Badge>
          </div>
        </div>
      </template>
    </LeftMenu>
    <div class="users-body">
      <UserUi
        :isRatingEnabled="isRatingEnabled"
        :user="currentUser"
        v-if="currentUser"
        @click:save="saveUser"
      />
    </div>
  </BaseLayout>
  <h1>test</h1>
  <p>{{ JSON.stringify(users) }}</p>
  <Icon name="arrow-right" fill="black" />
</template>

<script setup lang="ts">
import BaseLayout from "~/ui/layouts/BaseLayout.vue";
import LeftMenu from "~/ui/menus/LeftMenu.vue";
import Input from "~/ui/inputs/Input.vue";
import Button from "~/ui/buttons/Button.vue";
import Badge from "~/ui/badges/Badge.vue";
import Icon from "~/ui/icon/Icon.vue";
import UserUi from "~/ui/components/user.vue";
import { getUsers } from "~/api/users/getUsers";
import { getRankings } from "~/api/users/getRankings";
import { setUserInfo } from "~/api/users/setUserInfo";
import type { Users } from "~/types/users";
import type { User } from "~/types/users";
import { computed } from "vue";

const isRatingEnabled = ref<boolean>(false);
const users = ref<Users>([]);
const search = ref("");
const currentUserId = ref<number>();
const init = async () => {
  await getUsers().then(({ data }) => {
    users.value = getRankings(data);
  });
};
const switchRating = (state: boolean) => {
  isRatingEnabled.value = state;
};
const setUserId = (userId: number) => {
  currentUserId.value = userId;
};
const currentUser = computed(() =>
  users.value.find((user) => user.id === currentUserId.value),
);
const saveUser = (payload: {
  id: number;
  rank?: number;
  description?: string;
}) => {
  //@ts-ignore
  setUserInfo(payload);
  init();
};
init();

const sortedUsers = computed(() =>
  users.value
    .sort((a: User, b: User) => {
      return isRatingEnabled.value
        ? b.rank! - a.rank!
        : alphabetSorting(a.last_name, b.last_name);
    })
    .filter((user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(search.value.toLowerCase()),
    ),
);
const alphabetSorting = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};
</script>

<style lang="scss">
.users-menu__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__buttons {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    flex-wrap: wrap;
    gap: 1rem;
  }
}
.users-menu__body {
  width: 100%;
  height: 100%;
}
.users-menu__badge {
  &__icon {
    width: 30px;
    border-radius: 8px;
    margin-right: 16px;
  }
  &__name {
    font-family: Arial;
  }
}
</style>

<style lang="scss" scoped>
.users-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-left: 300px;
}
</style>
