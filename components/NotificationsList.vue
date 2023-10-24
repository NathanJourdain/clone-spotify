<script setup>
    import { notificationStore } from '~/components/notification-store';
</script>

<template>
    <div class="notifications-list">
        <Notification v-for="(notification, index) in notificationStore.notifications" :key="index" :notification="notification" />
    </div>
</template>

<style scoped>
.notifications-list {
    position: fixed;
    bottom: 80px;
    left: 0;
    right: 0;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 12px;
    z-index: 999;
}
</style>