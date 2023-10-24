<script setup>
import { getDeviceId } from '~/components/spotify';
import spotify from '../components/spotify';

const route = useRoute()

const { data: playlist, error } = await useAsyncData('playlistDetails', () => {
    return spotify.getPlaylist(route.params.id);
});

const playPlaylist = async () => {
    await spotify.play({
        device_id: getDeviceId(),
        context_uri: playlist.value.uri
    });
}

const tracks = playlist.value.tracks.items.filter((item) => item.track);

function toHoursAndMinutes(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    return `${hours} h ${minutes} min`;
}

const duration = toHoursAndMinutes(
    tracks.reduce((acc, item) => acc + item.track.duration_ms, 0)
);


</script>

<template>
    <div class="header" :style="{'--img': `url(${playlist.images[0]?.url})`}">
        <p class="type">Playlist</p>
        <h1 class="playlist-name"> {{ playlist.name }}</h1>

        <div class="playlist-infos">
            <p class="description">{{ playlist.description }}</p>
            <p class="details">
                {{ playlist.owner.display_name }}
                • {{ tracks.length }} titres, environ {{ duration }}
            </p>
        </div>

    </div>

    <div class="playlist-actions">
        <button class="play-btn" @click="playPlaylist">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
        </button>
    </div>

 
    <TrackItem v-for="track in tracks" :key="track.id" :track="track.track" />
</template>

<style scoped>
    .header {
        background: var(--img);
        background-size: cover;
        background-position: center;
        height: 40vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 0 24px 24px 24px;
        border-radius: 6px 6px 0 0;
        position: relative;
        z-index: 1;
    }
    .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: -1;
    }

    .type {
        font-size: 14px;
    }
    .playlist-name {
        font-size: 96px;
        line-height: 1;
        margin-bottom: 16px;
    }

    .description {
        color: rgba(255, 255, 255, 0.7);
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        max-height: 74px;
        overflow: hidden;
        word-break: break-word;
        font-size: 14px;
    }
    .details {
        margin-top: 8px;
        font-size: 14px;
    }

    .playlist-actions {
        display: flex;
        flex-direction: row;
        column-gap: 16px;
        margin-bottom: 24px;
        margin-top: 24px;
    }
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