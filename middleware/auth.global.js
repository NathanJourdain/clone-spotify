import spotify, {getAccessToken, refreshToken, getAuthenticationURL} from "~/components/spotify"

export default defineNuxtRouteMiddleware(async (to) => {
    const token = getAccessToken();

    if(to.path == "/callback") return console.log("Callback page, skipping middleware");

    if(!token) {
        console.log("No token found, redirecting to authentication page");
        return navigateTo(getAuthenticationURL(), { external: true});
    }

    try {
        const profile = await spotify.getMe();
    } catch (error) {
        if(error.status == 401) {
            const response = await refreshToken();
            localStorage.setItem("access_token", response.access_token);
        }
    }
    
})