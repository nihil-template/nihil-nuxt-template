<script setup lang="ts">
const { session } = useGetSession();
</script>

<template>
  <div>
    <h1>마이페이지</h1>

    <ClientOnly>
      <div v-if='session'>
        <div>
          <h2>내 정보</h2>

          <div>
            <div>
              <strong>이메일:</strong>
              <span>{{ session.emlAddr }}</span>
            </div>

            <div>
              <strong>사용자명:</strong>
              <span>{{ session.userNm }}</span>
            </div>

            <div>
              <strong>권한:</strong>
              <span>{{ session.userRole === 'ADMIN' ? '관리자' : '일반 사용자' }}</span>
            </div>

            <div v-if='session.userBiogp'>
              <strong>자기소개:</strong>
              <span>{{ session.userBiogp }}</span>
            </div>

            <div v-if='session.lastLgnDt'>
              <strong>마지막 로그인:</strong>
              <span>{{ new Date(session.lastLgnDt).toLocaleString('ko-KR') }}</span>
            </div>
          </div>

          <div>
            <NuxtLink to='/profile/edit'>
              <Button label='프로필 수정' icon='pi pi-user-edit' />
            </NuxtLink>
            <NuxtLink to='/profile/change-password'>
              <Button label='비밀번호 변경' icon='pi pi-key' severity='secondary' />
            </NuxtLink>
            <NuxtLink to='/profile/withdraw'>
              <Button label='회원탈퇴' icon='pi pi-user-minus' severity='danger' />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-else>
        <p>로그인이 필요합니다.</p>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
@reference '~/assets/styles/tailwind.css';

h1 {
  @apply text-h3 font-bold mb-6;
}

h2 {
  @apply text-h4 font-semibold mb-4;
}

div:nth-child(2) > div {
  @apply bg-white rounded-2 shadow p-6;
}

div:nth-child(2) > div > div:not(:last-child) {
  @apply mb-3 flex gap-2;
}

div:nth-child(2) > div > div strong {
  @apply min-w-24 text-gray-600;
}

div:nth-child(2) > div > div span {
  @apply text-gray-900;
}

div:last-child {
  @apply mt-6;
}
</style>
