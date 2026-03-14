<script setup lang="ts"></script>

<template>
  <button class="button-icon__big">
    <slot />
  </button>
</template>

<style scoped>
.button-icon__big {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  cursor: pointer;
  border-radius: 50px;
  border: 3px solid var(--color-bg);
  width: 48px;
  height: 48px;
}
.button-icon:hover {
  background: var(--color-bg-hover);
}
</style>
