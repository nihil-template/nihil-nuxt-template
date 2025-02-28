export const useNumberStore = defineStore('number', {
  state: () => ({
    number: 0,
  }),
  actions: {
    increment() {
      this.number++;
    },
    decrement() {
      this.number--;
    },
    reset() {
      this.number = 0;
    },
  },
});
