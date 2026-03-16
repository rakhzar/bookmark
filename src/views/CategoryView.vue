<script setup lang="ts">
import BookmarkCard from '@/components/BookmarkCard.vue';
import BookmarkSort from '@/components/BookmarkSort.vue';
// import CategoryHeader from '@/components/CategoryHeader.vue';
import type { Category } from '@/interfaces/category.interface';
import { useBookmarkStore } from '@/stores/bookmark.store';
import { useCategoryStore } from '@/stores/categories.store';
import {
  defineAsyncComponent,
  onMounted,
  ref,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import BookmarkAdd from '@/components/BookmarkAdd.vue';

const route = useRoute();
const categoryStore = useCategoryStore();
const bookmarkStore = useBookmarkStore();
const category = ref<Category>();

const CategoryHeader = defineAsyncComponent(
  () => import('@/components/CategoryHeader.vue'),
);

function sortBookmarks(sort: string) {
  bookmarkStore.activeSort = sort;
}

const bookmarksForCategory = computed(() => {
  if (!category.value) return [];
  return bookmarkStore.bookmarks.filter(
    (b) => b.category_id === category.value?.id,
  );
});

const sortedBookmarks = computed(() => {
  const items = bookmarksForCategory.value;
  if (bookmarkStore.activeSort === 'date') {
    return [...items].sort(
      (a, b) =>
        new Date(b.create_at).getTime() -
        new Date(a.create_at).getTime(),
    );
  } else {
    return [...items].sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }
});

onMounted(() => {
  const alias = route.params.alias;
  if (alias) {
    category.value =
      categoryStore.getCategoryByAlias(alias);
  }
});

watch(
  () => ({
    alias: route.params.alias,
    categories: categoryStore.categories,
  }),
  async (data) => {
    if (data.alias) {
      category.value = categoryStore.getCategoryByAlias(
        data.alias,
      );
    }
  },
);
</script>

<template>
  <CategoryHeader v-if="category" :category="category" />
  <BookmarkSort
    :option="bookmarkStore.activeSort"
    @sort="sortBookmarks"
  />
  <div class="scroll-container">
    <div class="category-list">
      <BookmarkAdd
        v-if="category"
        :category_id="category.id"
      />
      <BookmarkCard
        v-for="item in sortedBookmarks"
        :key="item.id"
        v-bind="item"
      />
    </div>
  </div>
</template>

<style scoped>
.category-list {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.scroll-container {
  max-height: 100vh;
  overflow-y: auto;
  padding-right: 8px;
}
</style>
