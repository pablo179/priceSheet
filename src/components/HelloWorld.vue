<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
    <p>hello</p>
  </div>
</template>

<script></script>

<style scoped></style>
