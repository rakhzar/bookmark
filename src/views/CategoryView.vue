<script setup lang="ts">
import BookmarkCard from '@/components/BookmarkCard.vue';
import CategoryHeader from '@/components/CategoryHeader.vue';
import type { Category } from '@/interfaces/category.interface';
import { useBookmarkStore } from '@/stores/bookmark.store';
import { useCategoryStore } from '@/stores/categories.store';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const categoryStore = useCategoryStore();
const bookmarkStore = useBookmarkStore();
const category = ref<Category>();

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
  <div class="category-list">
    <BookmarkCard
      v-for="item in bookmarkStore.bookmarks"
      :key="item.id"
      v-bind="item"
    />
  </div>
</template>

<style scoped>
.category-list {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
</style>
