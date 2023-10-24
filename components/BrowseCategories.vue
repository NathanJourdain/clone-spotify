<script setup>
import spotify from '~/components/spotify';

const { data: categories, error } = await useAsyncData('categories', () => {
    return spotify.getCategories();
});

</script>

<template>
    <div>
        <h1>Parcourir tout</h1>
        <div v-if="error">
            <p>Une erreur est survenue</p>
        </div>
        <div v-else>
            <div class="list">
                <div v-for="category in categories.categories.items" :key="category.id">
                    <CategoryItem :category="category" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 1rem;
    }

</style>