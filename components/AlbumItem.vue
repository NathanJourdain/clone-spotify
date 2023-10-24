<script setup>
import spotify, { getDeviceId } from '../components/spotify';

const { album } = defineProps(['album']);

const playAlbum = async (e) => {
    e.preventDefault();
    spotify.play({
        device_id: getDeviceId(),
        context_uri: album.uri
    });
}
</script>

<template>
    <NuxtLink :to="`/albums/${album.id}`" class="album">
        <div class="album-cover">
            <img :src="album.images[0].url" :alt="album.name" />
            <button class="play-btn" @click="playAlbum">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
            </button>
        </div>
        <h3 class="album-name">{{ album.name }}</h3>
    </NuxtLink>
</template>

<style scoped>
    .album {
        background-color: #181818;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        padding: 16px;
        color: #fff;
        text-decoration: none;
    }
    .album:hover {
        background-color: #282828;
    }
    .album-cover {
        width: 100%;
        aspect-ratio: 1 / 1;
        position: relative;
    }
    .album-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
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
    .album:hover .play-btn {
        transform: translateY(0);
        opacity: 1;
    }
    .play-btn svg {
        vertical-align: top;
    }


    .album-name {
        font-size: 16px;
        font-weight: 700;
        margin-top: 8px;
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>