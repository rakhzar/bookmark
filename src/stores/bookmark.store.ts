import { API_ROUTES, client } from '@/api';
import type { Bookmark } from '@/interfaces/bookmark.interface';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBookmarkStore = defineStore(
  'bookmarks',
  () => {
    const bookmarks = ref<Bookmark[]>([
      {
        id: 1,
        category_id: 2,
        title:
          'Github - gofiber/fiber: ⚡ Express inspired webframework written in Go',
        url: 'https://gofiber.io/',
        image:
          'https://repository-images.githubusercontent.com/234231371/00fd8700-5430-11ea-820b-15fd85b2472c',
        create_at: new Date(),
      },
    ]);

    async function fetchBookmarks(category_id: number) {
      const { data } = await client().get<Bookmark[]>(
        API_ROUTES.bookmarks(category_id),
      );
      if (data.length === 0) return;
      bookmarks.value = data;
    }

    return { bookmarks, fetchBookmarks };
  },
);
