import { defineStore } from "pinia";

export const useDemoStore = defineStore({
    id: "demoStore",
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++;
        }
    },
    getters: {
        double: (state) => {
            return state.count * 2;
        }
    }
})