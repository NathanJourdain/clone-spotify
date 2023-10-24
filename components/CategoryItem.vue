<script setup>
const { category } = defineProps([
    'category'
]);

const colors = [
    'rgb(0, 100, 80)',
    'rgb(115, 88, 255)',
    'rgb(30, 50, 100)',
    'rgb(232, 17, 91)',
    'rgb(186, 93, 7)',
    'rgb(20, 138, 8)'
];

const randomColor = colors[Math.floor(Math.random() * colors.length)];

</script>

<template>
    <NuxtLink :to="`/categories/${category.id}`" class="category" :style="{ backgroundColor: randomColor, '--icon' : `url(${category.icons[0].url})` }">
        <p>{{ category.name }}</p>
    </NuxtLink>
</template>

<style scoped>
    .category {
        display: block;
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 8px;
        position: relative;
        z-index: 1;
        overflow: hidden;
        color: #fff;
        text-decoration: none;
    }
    .category p {
        font-size: 1.5rem;
        font-weight: 700;
        padding: 16px;
        word-wrap: break-word;
    }
    .category::before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 100;
        width: 100px;
        height: 100px;
        background: var(--icon);
        background-size: cover;
        transform: rotate(25deg) translate(18%,-2%);
    }
</style>