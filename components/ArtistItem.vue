<script setup>
import spotify from '~/components/spotify';

const props = defineProps(['artist']);

const playArtist = async (e) => {
    e.preventDefault();
    spotify.play({
        device_id: getDeviceId(),
        context_uri: artist.uri
    });
}
</script>

<template>
    <NuxtLink :to="`/artists/${artist.id}`" class="artist">
        <div class="artist-cover">
            <img :src="artist.images[0]?.url" :alt="artist.name" />
            <button class="play-btn" @click="playArtist">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
            </button>
        </div>
        <h3>{{ artist.name }}</h3>
    </NuxtLink>
</template>


<style scoped>
    .artist {
        background-color: #181818;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        padding: 16px;
        color: #fff;
        text-decoration: none;
    }
    .artist:hover {
        background-color: #282828;
    }

    .artist-cover {
        width: 100%;
        aspect-ratio: 1 / 1;
        position: relative;
    }
    .artist-cover img {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        object-fit: cover;
    }
    .play-btn {
        position: absolute;
        bottom: 10px;
        right: 10px;
        transform: translateY(100%);
        opacity: 0;
        background-color: #1db954;
        border: none;
        border-radius: 99px;
        width: 50px;
        height: 50px;
        cursor: pointer;
        transition: transform 0.2s, opacity 0.2s;
    }
    .artist:hover .play-btn {
        transform: translateY(0);
        opacity: 1;
    }
    .play-btn svg {
        vertical-align: top;
    }

    .artist h3 {
        margin-top: 16px;
    }
</style>