<script setup>
import { getDeviceId } from '~/components/spotify';
import spotify from '../components/spotify';

const route = useRoute()
const { data: artist, pending, error } = await useAsyncData('artist', async () => {
    const [artist, topTracks, albums, relatedArtists] = await Promise.all([
        spotify.getArtist(route.params.id),
        spotify.getArtistTopTracks(route.params.id, 'FR'),
        spotify.getArtistAlbums(route.params.id),
        spotify.getArtistRelatedArtists(route.params.id)
    ]);

    return {
        artist,
        topTracks,
        albums,
        relatedArtists
    };
});

const playArtist = async (e) => {
    e.preventDefault();
    spotify.play({
        device_id: getDeviceId(),
        context_uri: artist.value.artist.uri
    });
}
console.log(artist.value.albums.items);
</script>

<template>
    <div class="header" :style="{'--img': `url(${artist.artist.images[0].url})`}">
        <h1 class="artist-name"> {{ artist.artist.name }}</h1>
    </div>

    <button class="play-btn" @click="playArtist">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
    </button>

    <div>
        <h2>Populaires</h2>
        <TrackItem v-for="track in artist.topTracks.tracks" :key="track.id" :track="track" />
   
        <h2>Discographie</h2>
        <div class="album-list horizontal-list">
            <AlbumItem v-for="album in artist.albums.items" :key="album.id" :album="album" />
        </div>

        <h1>Artistes similaires</h1>
        <div class="artist-list horizontal-list">
            <ArtistItem v-for="artist in artist.relatedArtists.artists" :key="artist.id" :artist="artist" />
        </div>
   </div>
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

    .artist-name {
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

    .details a {
        color: #fff;
        text-decoration: none;
        font-weight: 700;
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
    
    .album-list > *,
    .artist-list > * {
        width: 200px;
    }
    .album-list,
    .artist-list {
        gap: 16px;
        padding: 16px 0;
    }
</style>