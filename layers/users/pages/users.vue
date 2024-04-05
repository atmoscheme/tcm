<template>
  <BaseLayout />
  <h1>test</h1>
  <p>{{ JSON.stringify(users) }}</p>
</template>

<script setup lang="ts">
import BaseLayout from "~/ui/layouts/BaseLayout.vue";
import { getUsers } from "~/api/users/getUsers";
import type { Users } from "~/types/users";

const users = ref<Users>([]);
const { data } = await getUsers();
users.value = data;
console.log(data);
</script>

<style scoped></style>
