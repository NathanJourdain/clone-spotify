<script setup>
    const { label } = defineProps(['label']);

</script>

<template>
    <div class="context-menu-item">
        {{ label }}
    </div>
</template>

<style scoped>
    .context-menu-item {
        padding: 8px;
        cursor: pointer;
    }
    .context-menu-item:hover {
        background-color: hsla(0,0%,100%,.1);
    }
</style>