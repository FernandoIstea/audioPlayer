const imgCover = document.querySelector("img#cover")
const divPlayList = document.querySelector("div.playlist")

const playButton = document.querySelector("img#play")
const fforwardButton = document.querySelector("img#ffwd")
const rewindButton = document.querySelector("img#frew")

const imgVumeter = document.querySelector("img#vumeter")
const progressBar = document.querySelector("div.progress-bar")
const playingButtons = ["images/play.png", "images/pause.png"]
const vumeterImages = ["images/vumeter-on.gif", "images/vumeter-off.gif"]

let index = 1
const contador = {actual: 1, total: playList.length}

// const audioPlayer = document.createElement("audio")
const audioPlayer = new Audio()
audioPlayer.id = "AudioPlayer"
audioPlayer.preload = "auto"
audioPlayer.src = "https://ferpro.online/es/mp3/musica/the-ramones-baby-i-love-you.mp3"
audioPlayer.volume = 0.01

function cargarPlaylist() {
    if (playList.length > 0) {
        playList.forEach((song)=> {
            let paragraph = `<p id="${index}" data-songname="${song.source}">${song.artist} - ${song.title}</p>`
            divPlayList.innerHTML += paragraph
            index++
        })
        agregarEventoClickPlayList()
    }
}

function configurarMediaSession(song) {
    navigator.mediaSession.metadata = new MediaMetadata(song)
}

function activarBloqueo() {
    if ('wakeLock' in navigator) {
        navigator.wakeLock.request('screen')
        .then(()=> console.log('Se bloqueó la pantalla.'))
    }
}

function agregarEventoClickPlayList() {
    const listaCanciones = document.querySelectorAll("p[data-songname]")
    
    if (listaCanciones.length > 0) {
        listaCanciones.forEach((pCancion)=> {
            pCancion.addEventListener("click", ()=> {
                let cancionSeleccionada = playList.find((song)=> song.source === pCancion.dataset.songname )
                audioPlayer.src = cancionSeleccionada.source
                imgCover.src = cancionSeleccionada.artwork[0].src
                audioPlayer.play()
                activarBloqueo()
                configurarMediaSession(cancionSeleccionada)
            })
        })
    }
} 

function mostrarProgresoDeCancion() {
    const porcentajeReproduccion = (audioPlayer.currentTime / audioPlayer.duration) * 100 // porcentaje 
    return parseFloat(porcentajeReproduccion)
}

// FUNCION PRINCIPAL
cargarPlaylist()

// EVENTOS
audioPlayer.addEventListener("playing", ()=> playButton.src = playingButtons[1])
audioPlayer.addEventListener("play", ()=> imgVumeter.src = vumeterImages[0])
audioPlayer.addEventListener("pause", ()=> imgVumeter.src = vumeterImages[1])
audioPlayer.addEventListener("timeupdate", ()=> progressBar.style.width = `${mostrarProgresoDeCancion() * 4}px` )

audioPlayer.addEventListener("ended", ()=> {
    imgVumeter.src = vumeterImages[1]
    progressBar.style.width = '0px'
    playButton.src = playingButtons[0]
})

playButton.addEventListener("click", ()=> {
    
})
