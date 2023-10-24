<script setup>
    import { notificationStore } from './notification-store';

    const { notification } = defineProps(['notification']);

    setTimeout(() => {
        notificationStore.removeNotification(notification);
    }, 3000);
</script>

<template>
    <div class="notification">
        <div class="notification-content">
            <p>{{ notification.text }}</p>
        </div>
    </div>
</template>

<style scoped>
.notification {
    padding: 1rem;
    background-color: #1e1e1e;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.notification-content {
    max-width: 600px;
    width: 100%;
    text-align: center;
}
</style>