<script setup>
useHead({
  link: [{rel: "stylesheet", href: "/global.css"}],
  script: [{src: "https://sdk.scdn.co/spotify-player.js"}]
})

</script>

<template>
  <div class="container">
    <div class="sidebar">
      <SideBar />
    </div>

    <main class="content">
      <slot />
      <NotificationsList />
    </main>

    <div class="player">
      <Player />
    </div>
  </div>

</template>

<style scoped>
  .container {
    display: grid;
    grid-template-areas: 'sidebar content' 'player player';
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    gap: 16px;
    height: 100vh;
    background: #000;
    padding: 8px;
  }
  .sidebar {
    grid-area: sidebar;
  }
  .content {
    position: relative;
    grid-area: content;
    height: 100%;
    overflow-y: scroll;
    background-color: #121212;
    border-radius: 10px;
    padding: 16px;
  }
  .content::-webkit-scrollbar {
    width: 8px;
  }
  .content::-webkit-scrollbar-track {
    background: #121212;
  }
  .content::-webkit-scrollbar-thumb {
    background: #282828;
    border-radius: 10px;
  }
  .content::-webkit-scrollbar-thumb:hover {
    background: #383838;
  }
  .content::-webkit-scrollbar-thumb:active {
    background: #383838;
  }


  .player {
    grid-area: player;
    border-radius: 10px;
  }
</style>