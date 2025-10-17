const imgCover = document.querySelector("img#cover")
const divPlayList = document.querySelector("div.playlist")

const playButton = document.querySelector("img#play")
const fforwardButton = document.querySelector("img#ffwd")
const rewindButton = document.querySelector("img#frew")

const imgVumeter = document.querySelector("img#vumeter")
const progressBar = document.querySelector("div.progress-bar")

const playingButtons = {play: "images/play.png", 
                        pause: "images/pause.png" }

const vumeterImages = {vumeterOn: "images/vumeter-on.gif", 
                       vumeterOff: "images/vumeter-off.gif"}

const contador = { actual: 1, total: playList.length }
let index = 1

const audioPlayer = new Audio()
audioPlayer.id = 'audioPlayer'
audioPlayer.src = ""
audioPlayer.preload = 'auto'
audioPlayer.volume = 0.4

// FUNCIONES

function cargarPlaylist() {
    if (playList.length > 0) {
        playList.forEach((cancion)=> {
            const paragraph = document.createElement('p')
            paragraph.id = index
            paragraph.textContent = `${cancion.artist} - ${cancion.title}`
            paragraph.dataset.songname = cancion.source
            divPlayList.append(paragraph)
            index++
        })
        agregarClickCanciones()
    }
}

function agregarClickCanciones() {
    const pCanciones = document.querySelectorAll('p[data-songname]')
    
    if (pCanciones.length > 0) {
        pCanciones.forEach((pCancion)=> {
            pCancion.addEventListener("click", ()=> {
                const cancionSeleccionada = playList.find((cancion)=> cancion.source === pCancion.dataset.songname)
                imgCover.src = cancionSeleccionada.artwork[0].src
                contador.actual = parseInt(pCancion.id)
                audioPlayer.src = cancionSeleccionada.source
                audioPlayer.play()
                navigator.mediaSession.metadata = new MediaMetadata(cancionSeleccionada)
            })
        })
    }
}

// FUNCIÓN PRINCIPAL
cargarPlaylist()

audioPlayer.addEventListener("timeupdate", ()=> {
    const progreso = (audioPlayer.currentTime / audioPlayer.duration) * 100
    progressBar.style.width = `${progreso * 4}px`
})

audioPlayer.addEventListener("play", ()=> {
    imgVumeter.src = vumeterImages.vumeterOn
    playButton.src = playingButtons.pause
})

audioPlayer.addEventListener("pause", ()=> {
    imgVumeter.src = vumeterImages.vumeterOff
    playButton.src = playingButtons.play
})

audioPlayer.addEventListener("ended", ()=> {
    if (contador.actual <= contador.total) {
        contador.actual++
        const pCancion = document.querySelector(`p[id="${contador.actual}"]`)
        pCancion.scrollIntoView({behavior: 'smooth'})
        pCancion.click()
    }
})

playButton.addEventListener("click", ()=> {
    if (playButton.src.includes('play.png')) {
        playButton.src = playingButtons.pause
        imgVumeter.src = vumeterImages.vumeterOn
        audioPlayer.play()
    } else {
        playButton.src = playingButtons.play
        imgVumeter.src = vumeterImages.vumeterOff
        audioPlayer.pause()
    }
})