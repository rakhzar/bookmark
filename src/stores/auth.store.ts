import { API_ROUTES, client } from '@/api';
import type { LoginResponse } from '@/interfaces/auth.interface';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>();

  async function login(email: string, password: string) {
    const { data } = await client().post<LoginResponse>(
      API_ROUTES.auth.login,
      {
        email,
        password,
      },
    );
    token.value = data.token;
  }

  return { token, login };
});
