import { reactive } from "vue";

export const notificationStore = reactive({
    notifications: [],
    addNotification(notification) {
        this.notifications.push(notification);
    },
    removeNotification(notification) {
        this.notifications = this.notifications.filter(n => n !== notification);
    }
})