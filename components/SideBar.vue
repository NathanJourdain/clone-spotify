<script setup>
import spotify from '../components/spotify';

const { data: playlists, error } = await useAsyncData('playlistsSideBar', () => {
    return spotify.getUserPlaylists();
});

</script>

<template>
    <nav>
        <div class="links">
            <NuxtLink to="/" class="nav-item" title="Accueil">
                <span class="name">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                </span>
            </NuxtLink>
            <NuxtLink to="/search" class="nav-item" title="Recherche">
                <span class="name">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                </span>
            </NuxtLink>
        </div>
        <div class="links">
            <NuxtLink 
                v-for="playlist in playlists.items" :key="playlist.id" 
                :to="`/playlists/${playlist.id}`" 
                :title="playlist.name"
                class="nav-item">
                <img :src="playlist.images[0]?.url" :alt="playlist.name" width="50" height="50" />
            </NuxtLink>
        </div>
    </nav>
</template>

<style scoped>
    nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        gap: 8px;
    }

    .links {
        background: #121212;
        border-radius: 10px;
        padding: 8px 12px;
    }

    .links:last-of-type {
        height: 100%;
    }
    
    .nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        color: rgb(179, 179, 179);
        fill: currentColor;
        margin-bottom: 8px;
    }
    .nav-item:hover {
        color: #fff;
    }

    .nav-item img {
        border-radius: 4px;
    }

</style>