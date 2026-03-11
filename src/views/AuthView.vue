<script setup lang="ts">
import ButtonText from '@/components/ButtonText.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="auth">
    <div class="auth-form">
      <h1 class="auth__header">Bookmarkly</h1>
      <ButtonText @click="router.push('/main')"
        >Вход
      </ButtonText>
    </div>
  </div>
</template>

<style scoped>
.auth {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.auth__header {
  font-size: 52px;
  font-weight: 700;
}

.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 52px;
}
</style>
