<script setup>
const props = defineProps([
    'results'
]);

const types = Object.keys(props.results);
const selectedType = useState('selectedType', () => types[0]);

</script>

<template>
    <div class="filters">
        <button v-for="type in types" :key="type" :value="type" @click="selectedType = type" :class="{ 'selected': selectedType == type }">
            {{ type }}
        </button>
    </div>

    <div class="results">
        <div v-if="selectedType === 'playlists' || selectedType === 'albums' || selectedType == 'artists'" class="grid">
            <PlaylistItem v-for="item in results[selectedType]?.items" :key="item.id" :playlist="item" v-if="selectedType == 'playlists'" />

            <AlbumItem v-for="item in results[selectedType]?.items" :key="item.id" :album="item" v-if="selectedType == 'albums'" />
            
            <ArtistItem v-for="item in results[selectedType]?.items" :key="item.id" :artist="item" v-if="selectedType == 'artists'" />
        </div>
        <div v-else>
            <TrackItem v-for="item in results[selectedType]?.items" :key="item.id" :track="item" v-if="selectedType == 'tracks'" />
        </div>
    </div>
</template>

<style scoped>
    .filters {
        display: flex;
        gap: 8px;
        margin-top: 12px;
        margin-bottom: 12px;
    }
    .filters button {
        padding: 8px 12px;
        cursor: pointer;
        background-color: rgb(36, 36, 36);
        border-radius: 99px;
        border: none;   
        color: #fff;
        font-size: 16px;
    }
    .filters button.selected {
        background-color: #fff;
        color: #000;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 1rem;
    }
</style>
