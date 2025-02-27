export const useTestStore = defineStore('test', {
  state: () => ({
    selectedKeyword: '',
    isPopUp: false,
    sideBarOpen: true,
  }),
  actions: {
    setSelectedKeyword(keyword: string) {
      this.selectedKeyword = keyword;
    },
    setIsPopUp(isPopUp: boolean) {
      this.isPopUp = isPopUp;
    },
    setSideBarOpen(sideBarOpen: boolean) {
      this.sideBarOpen = sideBarOpen;
    },
  },
});
