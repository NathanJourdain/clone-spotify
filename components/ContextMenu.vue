<template>
    <div class="custom-menu">
        <slot />
    </div>
</template>

<style scoped>
    .custom-menu {
        width: max-content;
        max-width: 300px;
        background-color: #282828;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
</style>