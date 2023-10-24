<script setup>
    import { getToken } from '~/components/spotify';

    const route = useRoute()
    const code = route.query.code

    const token = await getToken(code);
    console.log(token);
    localStorage.setItem('access_token', token.access_token)
    localStorage.setItem('refresh_token', token.refresh_token)
    
    setTimeout(() => {
        navigateTo('/')
    }, 1000)
</script>

<template>
    <div>
        <h1>Connexion en cours...</h1>
    </div>
</template>