import { defineStore } from 'pinia';

interface AuthCardHeader {
  title?: string;
  description?: string;
}

export const useAuthCardStore = defineStore(
  'auth-card',
  () => {
  // ==============================================
  // 카드 관련 변수
  // ==============================================
  /**
   * @description 카드 헤더
   */
    const authCardHeader = ref<AuthCardHeader>({});

    // ==============================================
    // 카드 관련 액션
    // ==============================================
    /**
   * @description 카드 헤더 설정
   */
    function setAuthCardHeader(header: AuthCardHeader) {
      authCardHeader.value = header;
    }

    /**
   * @description 카드 헤더 초기화
   */
    function resetAuthCardHeader() {
      authCardHeader.value = {};
    }

    return {
    // 상태
      authCardHeader,
      // 액션
      setAuthCardHeader,
      resetAuthCardHeader,
    };
  }
);
