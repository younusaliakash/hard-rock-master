 const searchSongs = async () => {
     const searchText = document.getElementById('search-field').value;
     try{
        const url = `https://api.lyrics.ovh/suggest/${searchText}`;
        const response = await fetch(url)
        const data = await response.json()
        displaySongs(data.data)
     }
     catch(error){
        errorText("Result Not Found!!")
     }
 }

 const displaySongs = songs =>{
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = ""
    const errorText = document.getElementById("error-text");
    errorText.style.display ="none";
    songs.forEach(song => { 
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        songContainer.appendChild(songDiv)
        // console.log(song)
     });
 }

 const getLyrics = (artist , title) =>{
     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
     fetch (url)
     .then(res =>res.json())
     .then(data => showLyrics(data.lyrics))
     .catch( () => errorText("Opps!! Somthing Wrong. Try again Later."))
    }

const showLyrics = songLyrics =>{
    console.log(songLyrics)
    if( songLyrics === ''){
        errorText("Sorry! No Lyrics found for this song.")
    }
    else{
        const lyricsArea = document.getElementById("lyrics-area");
        lyricsArea.innerText = songLyrics;
    }
}

const errorText = (error) => {
    const errorText = document.getElementById("error-text");
    errorText.innerHTML = ""
    const errorDiv = document.createElement('div');
        errorDiv.className = "single-result row align-items-center my-3 p-3"
        errorDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name"><i class="fas fa-exclamation-circle error-note"></i> ${error}</h3>
            </div>
            <div class="col-md-3 text-md-right text-center">
            
            <div onclick="colseTab()" class="btn btn-danger"><i class="fas fa-times"></i></div>
            </div>
        `
        errorText.appendChild(errorDiv);
        errorText.style.display= "block";
}
const colseTab = () => {
    const errorText = document.getElementById("error-text");
    errorText.style.display= "none";
}