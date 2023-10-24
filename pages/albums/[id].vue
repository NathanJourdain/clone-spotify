<script setup>
import { getDeviceId } from '~/components/spotify';
import spotify from '../components/spotify';

const route = useRoute()

const { data: album, error } = await useAsyncData('albums', () => {
    return spotify.getAlbum(route.params.id);
});

const tracks = album.value.tracks.items;

tracks.forEach(track => {
    track.album = album.value;
});


const playAlbum = async () => {
    await spotify.play({
        device_id: getDeviceId(),
        context_uri: album.value.uri
    });
}
</script>

<template>
    <h1>{{ album.name }}</h1>
    <h2>{{ album.artists.map(a => a.name).join(',') }}</h2>
    
    <button class="play-btn" @click="playAlbum">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
    </button>

    <TrackItem v-for="track in tracks" :key="track.id" :track="track" />
</template>

<style scoped>
    .play-btn {
        background-color: #1db954;
        border: none;
        border-radius: 99px;
        width: 50px;
        height: 50px;
        cursor: pointer;
        transition: transform 0.2s, opacity 0.2s;
    }
    .play-btn svg {
        vertical-align: top;
    }
</style>