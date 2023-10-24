<script setup>
import spotify from '../components/spotify';

const route = useRoute()

const { data: category, tegory, error } = await useAsyncData('artist', async () => {
    const [playlists, details] = await Promise.all([
        spotify.getCategoryPlaylists(route.params.id),
        spotify.getCategory(route.params.id)
    ]);
    return {
        playlists,
        details
    };
});

</script>

<template>
    <h1>{{ category.details.name }}</h1>

    <div v-if="error">
        <p>Une erreur est survenue</p>
    </div>
    <div v-else class="playlists-grid">
        <PlaylistItem :playlist="playlist" v-for="playlist in category.playlists.playlists.items" :key="playlist.id" />
    </div>
</template>


<style scoped>
    .playlists-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 16px;
    }
</style>