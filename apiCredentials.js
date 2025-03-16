const clientId = "784efea53b8a492f8964659f5251a9aa";
const clientSecret = "cebc1051803a475a8cb89b6795ff41ac";
const playlistId = "6EmqkQ4CoJCVJ6Yf93LFrb";

async function getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
}

async function fetchPlaylist() {
    const accessToken = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await response.json();
    const playlistContainer = document.getElementById("playlist-container");
    playlistContainer.innerHTML = ""; 

    data.tracks.items.forEach(item => {
        const track = item.track;
        const div = document.createElement("div");
        div.classList.add("playlist-item");
        div.innerHTML = `
            <strong>${track.name}</strong> - ${track.artists.map(artist => artist.name).join(", ")}
        `;
        playlistContainer.appendChild(div);
    });
}

fetchPlaylist();
