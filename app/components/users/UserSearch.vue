<script setup lang="ts">
import type { UserInfoType } from '~/schemas/user.schema';

const searchEmail = ref('');

const emit = defineEmits<{
  searchResult: [user: UserInfoType | null];
  clearSearch: [];
}>();

const { response, trigger } = useGetUserByEmail(searchEmail.value.trim());

const handleClearSearch = () => {
  searchEmail.value = '';
  emit('clearSearch');
};

const searchByEmail = async () => {
  if (!searchEmail.value.trim()) {
    handleClearSearch();
    return;
  }

  await trigger();

  if (response.value?.data) {
    emit('searchResult', response.value.data);
  }
  else {
    emit('searchResult', null);
  }
};
</script>

<template>
  <div class='search-section'>
    <div class='search-input'>
      <InputText
        v-model='searchEmail'
        placeholder='이메일로 검색...'
        @keyup.enter='searchByEmail'
      />
      <Button
        icon='pi pi-search'
        @click='searchByEmail'
        :disabled='!searchEmail.trim()'
      />
      <Button
        icon='pi pi-times'
        severity='secondary'
        @click='handleClearSearch'
        v-tooltip.top="'검색 초기화'"
      />
    </div>
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

.search-section {
  @apply space-y-3;
}

.search-input {
  @apply flex gap-2 items-center;
}

.search-input input {
  @apply flex-1 max-w-md;
}
</style>
