<script setup lang="ts">
import ButtonText from './ButtonText.vue';

const { isOpened, text } = defineProps<{
  isOpened: boolean;
  text: string;
}>();

const emit = defineEmits<{
  (e: 'ok'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <div class="popup__cover" v-if="isOpened">
    <div class="popup">
      {{ text }}
      <div class="popup__actions">
        <ButtonText @click="emit('ok')">Да</ButtonText>
        <ButtonText @click="emit('cancel')">Нет</ButtonText>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup__cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-inactive);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  padding: 20px;
  border-radius: 20px;
  background-color: var(--color-bg);
  max-width: 350px;
}

.popup__actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}
</style>
