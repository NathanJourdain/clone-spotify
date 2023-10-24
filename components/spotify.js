import SpotifyWebApi from 'spotify-web-api-js';

const redirectURI = "http://127.0.0.1:3000/callback";

const clientId = "<your-client-id>";
const clientSecret = "<your-client-secret>";

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return null;
  }
  return accessToken;
};

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    return null;
  }
  return refreshToken;
};

export const getAuthenticationURL = () => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "user-modify-playback-state",
    "user-read-playback-state",
  ];

  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes.join(
    " "
  )}&redirect_uri=${redirectURI}`;
};

export const getToken = async (code) => {
  const authOptions = {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirectURI,
      grant_type: "authorization_code",
    }),
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );

  return response.json();
};

export const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  const authOptions = {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );

  return response.json();
};


// SPOTIFY API
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(getAccessToken())
export default spotifyApi

// PLAYER
let player, deviceId;
window.onSpotifyWebPlaybackSDKReady = () => {
  const token = getAccessToken();
  player = new Spotify.Player({
    name: "Spotify Clone Player",
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.5,
  });

  // Ready
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    deviceId = device_id;
    window.dispatchEvent(new Event('playerReady'));
  });

  // Not Ready
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });

  player.connect();
};

export const getPlayer = () => {
  return player;
}

export const getDeviceId = () => {
  return deviceId;
}