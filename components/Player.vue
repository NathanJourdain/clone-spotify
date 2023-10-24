<script setup>
import spotify, { getPlayer } from '~/components/spotify';

const playbackState = ref(null);

onMounted(async () => {
    // INIT PLAYER
    playbackState.value = await spotify.getMyCurrentPlaybackState();

    window.addEventListener('playerReady', function() {
        getPlayer().addListener('player_state_changed', async (state) => {
           playbackState.value = state
        });
    })

});

const togglePause = () => {
    if (playbackState.value?.paused) {
        spotify.play();
    } else {
        spotify.pause();
    }
}

const toPrevious = () => {
    if(playbackState.value.position > 3000) {
        spotify.seek(0);
    } else {
        spotify.skipToPrevious();
        playbackState.paused ?? spotify.play();
    }
    
}

const toNext = () => {
    spotify.skipToNext();
    playbackState.paused ?? spotify.play();
}

const updateProgress = (event) => {
    spotify.seek(event.target.value);
    playbackState.paused ?? spotify.play();
}

const updateVolume = (event) => {
    spotify.setVolume(event.target.value);
}

setInterval(() => {
    if(playbackState.value && !playbackState.value.paused) {
        playbackState.value.position += 1000;
    }
}, 1000);

</script>

<template>
    <div class="player" v-if="playbackState">
        <div class="infos">
            <img :src="playbackState.track_window.current_track.album.images[0]?.url" />
            <p>
                <span>{{ playbackState.track_window.current_track.name }}</span>
                <span class="artists">
                    <span v-for="(artist, index) in playbackState.track_window.current_track.artists" :key="index">
                        <NuxtLink :to="'/artists/' + artist.id">{{ artist.name }}</NuxtLink>
                        <span v-if="index < playbackState.track_window.current_track.artists.length - 1">, </span>
                    </span>
                </span>
            </p>
        </div>
        <div class="controls-player">
            <div class="buttons">
                <button @click="toPrevious">
                    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 haNxPq"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path></svg>
                </button>
                <button @click="togglePause" class="play">
                    <svg v-if="playbackState.paused"
                    role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 haNxPq"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
                    <svg v-else
                    role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 haNxPq"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
                </button>
                <button @click="toNext">
                    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 haNxPq"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path></svg>
                </button>
            </div>
            <div class="progress">
                <input type="range" step="1" min="0" :max="playbackState.duration" :value="playbackState.position" @input="updateProgress" />
            </div>
        </div>
        <div class="controls-device">
            <input type="range" step="1" min="0" max="100" @input="updateVolume" value="60" />
        </div>
    </div>
</template>

<style scoped>
    .player {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .player > div {
        width: 100%;
    }


    .infos {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 12px;
    }
    .infos img {
        width: 50px;
        height: 50px;
        border-radius: 4px;
    }
    .infos p .artists {
        display: block;
    }
    .infos p .artists a {
        font-size: 0.75em;
        color: #b3b3b3;
        text-decoration: none;
    }
    .infos p .artists a:hover {
        text-decoration: underline;
    }

    .player .controls-player {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .player .controls-device {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }


    .player .controls-player .buttons {
        display: flex;
        flex-direction: row;
        column-gap: 12px;
        margin-bottom: 12px;
    }

    .player .controls-player .buttons button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        fill: #b4b4b4;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .player .controls-player .buttons button:hover{
        fill: #fff;
    }

    .player .controls-player .buttons .play {
        background-color: #fff;
        fill: #000;
        transition: transform 0.2s ease-in-out;
    }
    .player .controls-player .buttons .play:hover {
        fill: #000;
        transform: scale(1.1);
    }


    .player .controls-player .progress {
        width: 100%;
    }
    .player .controls-player .progress input {
        width: 100%;
    }


    .player .controls-player .progress input {
        width: 100%;
    }

</style>