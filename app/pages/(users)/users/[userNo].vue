<script setup lang="ts">
definePageMeta({
  layout: 'users-layout',
});

const route = useRoute();
const userNo = computed(() => Number(route.params.userNo));

// 사용자 정보 조회
const userResponse = useGetUserByNo(userNo.value);

const userData = computed(() => {
  if (userResponse.pending) {
    return null;
  }

  return userResponse.response.value?.data;
});

// 동적 메타데이터 설정
useSetMeta({
  title: `사용자 "${userData.value?.userNm}" 정보`,
  url: `/users/${userData.value?.userNo}`,
});
</script>

<template>
  <UserDetail :user-no='userNo' />
</template>
