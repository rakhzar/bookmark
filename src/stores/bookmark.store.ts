import { API_ROUTES, client } from '@/api';
import type { Bookmark } from '@/interfaces/bookmark.interface';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const STORAGE_KEY = 'bookmarks';

export const useBookmarkStore = defineStore(
  'bookmarks',
  () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const bookmarks = ref<Bookmark[]>(
      saved ? JSON.parse(saved) : [],
    );

    const activeSort = ref<string>('date');

    function deleteBookmark(id: number) {
      bookmarks.value = bookmarks.value.filter(
        (b) => b.id !== id,
      );
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(bookmarks.value),
      );
    }

    async function addBookmark(
      url: string,
      category_id: number,
    ) {
      const domain = new URL(url).hostname;
      const image = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      const title = url
        .replace(/^https?:\/\//, '')
        .split('/')[0];

      try {
        const { data } = await client().post<Bookmark>(
          API_ROUTES.bookmarks.create,
          {
            url,
            category_id,
            title,
            image,
          },
        );

        bookmarks.value.push(data);

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(bookmarks.value),
        );
      } catch (error) {
        console.error(
          'Ошибка при создании закладки:',
          error,
        );
      }
    }

    return {
      bookmarks,
      deleteBookmark,
      activeSort,
      addBookmark,
    };
  },
);
