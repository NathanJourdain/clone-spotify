<script setup>
import spotify from '~/components/spotify';

const search = useState('search', '');
const searchResults = useState('searchResults', () => null);

const handleSearch = async () => {
    if(search.value.length == 0) {
        searchResults.value = null;
        return;
    }
    searchResults.value = await spotify.search(search.value, ['album', 'artist', 'playlist', 'track'])
}

const handleReset = () => {
    search.value = '';
    searchResults.value = null;
}

onMounted(() => {
    document.querySelector('.search-bar input').focus();

    document.addEventListener('keyup', (e) => {
        if(e.key == 'Escape') {
            handleReset();
        }
    })
})
</script>

<template>
    <form @input="handleSearch" class="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>

        <input type="text" v-model="search" placeholder="Que souhaitez-vous écouter ?"/>

        <span v-if="search != ''" @click="handleReset">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" style="vertical-align: middle;"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </span>
    </form>

    <div v-if="searchResults">
        <SearchResults :results="searchResults" />
    </div>
</template>

<style scoped>
    .search-bar {
        display: grid;
        grid-template-columns: auto 1fr auto;
        place-items: center;
        border-radius: 99px;
        border: 2px solid transparent;
        fill: #fff;
        max-width: 350px;
        padding: 6px 12px;
        background: rgb(36, 36, 36);
    }
    .search-bar:focus-within {
        border-color: #fff;
    }
    .search-bar input {
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
        line-height: 36px;
        width: 100%;
        padding: 0 6px;
        font-size: 16px;
    }


</style>