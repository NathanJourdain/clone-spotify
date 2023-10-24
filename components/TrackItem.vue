<script setup>
import spotify, { getDeviceId, getPlayer } from '~/components/spotify';
import { notificationStore } from '~/components/notification-store'
const {track} = defineProps(['track']);

const play = async () => {
    await spotify.play({
        uris: [track.uri],
        device_id: getDeviceId()
    })
}

function toMinutes(ms) {
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor(((ms % 3600000) % 60000) / 1000);
    return `${minutes}min ${seconds}s`;
}

let menuOpen = ref(false);
function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}

async function addToQueue() {
    await spotify.queue(track.uri, {
        device_id: getDeviceId()
    })
    menuOpen.value = false;
    notificationStore.addNotification({text: 'Titre ajouté à la file d\'attente'});
}

</script>

<template>
    <div class="track">
        <button @click="play" class="play-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
        </button>
        <div class="track-info">
            <img :src="track.album?.images[0].url" :alt="track.name" width="50" height="50" />
            <div>
                <p>{{ track.name }}</p>
                <span v-for="(artist, index) in track.artists" :key="index">
                    <NuxtLink :to="'/artists/' + artist.id">{{ artist.name }}</NuxtLink>
                    <span v-if="index < track.artists.length - 1">, </span>
                </span>
            </div>
        </div>
        <div class="track-album">
            {{ track.album?.name }}
        </div>
        <div class="track-duration">
            {{ toMinutes(track.duration_ms) }}
        </div>
        <div class="track-menu">
            <button @click="toggleMenu">
                <svg viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M256,224c-17.7,0-32,14.3-32,32s14.3,32,32,32c17.7,0,32-14.3,32-32S273.7,224,256,224L256,224z"/><path d="M128.4,224c-17.7,0-32,14.3-32,32s14.3,32,32,32c17.7,0,32-14.3,32-32S146,224,128.4,224L128.4,224z"/><path d="M384,224c-17.7,0-32,14.3-32,32s14.3,32,32,32s32-14.3,32-32S401.7,224,384,224L384,224z"/></g></svg>
            </button>
            <ContextMenu v-if="menuOpen" class="track-context-menu">
                <ContextMenuItem label="Ajouter à la file d'attente" @click="addToQueue" />
            </ContextMenu>
        </div>
    </div>
</template>

<style scoped>
.track {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 16px;
    border-radius: 4px;
}
.track:hover {
    background-color: hsla(0,0%,100%,.1);
}
.track-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
}
.track-info img {
    margin-right: 1rem;
}
.track-info a {
    color: #b9b9b9;
    text-decoration: none;
}
.track-info a:hover {
    text-decoration: underline;
}
.track-album, .track-duration {
    flex: 1;
}

.play-btn {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 1rem;
}
.play-btn svg {
    fill: #fff;
    width: 1rem;
    height: 1rem;
}

.track-menu {
    position: relative;
}
.track-menu button {
    background: none;
    border: none;
    cursor: pointer;
}
.track-menu svg {
    fill: #fff;
    width: 1rem;
    height: 1rem;
}

.track-context-menu {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(-100%, 100%);
}




</style>