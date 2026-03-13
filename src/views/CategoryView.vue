<script setup lang="ts">
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
    if (category.value) {
      bookmarkStore.fetchBookmarks(category.value.id);
    }
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
      if (category.value) {
        await bookmarkStore.fetchBookmarks(
          category.value.id,
        );
      }
    }
  },
);
</script>

<template>
  <CategoryHeader v-if="category" :category="category" />
</template>
