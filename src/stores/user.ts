import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        registered: false
    }),
    actions: {
        setRegistered(value: boolean) {
            this.registered = value;
        }
    }
});