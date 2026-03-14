import type { Bookmark } from '@/interfaces/bookmark.interface';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const STORAGE_KEY = 'bookmarks';

export const useBookmarkStore = defineStore(
  'bookmarks',
  () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const bookmarks = ref<Bookmark[]>(
      saved
        ? JSON.parse(saved)
        : [
            {
              id: 2,
              category_id: 2,
              title:
                'Github - gofiber/fiber: ⚡ Express inspired webframework written in Go',
              url: 'https://gofiber.io/',
              image:
                'https://repository-images.githubusercontent.com/234231371/00fd8700-5430-11ea-820b-15fd85b2472c',
              create_at: new Date('2025-01-01'),
            },
            {
              id: 1,
              category_id: 2,
              title:
                'PurpleSchoo - Обучающая платформа для старта карьеры в IT и роста | Антон Ларечев',
              url: 'https://purpleschool.ru/',
              image:
                'https://habrastorage.org/getpro/moikrug/uploads/company/100/008/877/4/logo/big_ae43eaf1ccdde19716aff31009e04640.png',
              create_at: new Date('2026-03-14'),
            },
          ],
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

    return { bookmarks, deleteBookmark, activeSort };
  },
);
