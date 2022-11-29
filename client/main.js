//const { default: axios } = require("axios")

const collectionContainer = document.querySelector("#collection-continer")

const baseURL = `http://localhost:3004`

const collectionCallback = ({ data: collection }) => displayCollection(collection)
const getAllAlbums = () => axios.get(baseURL).then(collectionCallback).catch(errCallback)
const errCallback = err => console.log(err)

document.getElementById('form-container').hidden = true;
document.getElementById('collection-continer').hidden=true;


const viewCollectionBtn = document.querySelector(".btn-1")
const addtoCollectionBtn = document.querySelector(".btn-2")

const btnContainer = document.querySelector(".btn-container");
const imgContainer = document.querySelector(".img-container");

const formContainer = document.querySelector("#form-container")


addAlbumBtn = document.querySelector(".add-album-btn")




function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector("#album-title")
    let artist= document.querySelector("#artist")
    let genre= document.querySelector("#genre")
    let pressing= document.querySelector("#pressing")
    let color= document.querySelector("#color")

    let bodyObj = {
        title: title.value,
        artist: artist.value,
        genre: genre.value,
        pressing: pressing.value,
        color: color.value
       
    }

    createAlbum(bodyObj)
    title.value = ''
    artist.value = ''
    genre.value = ''
    pressing.value = ''
    color.value = ''
}


function createAlbumCard(album){
    const albumCard = document.createElement('div')
    taskCard.classList.add('album-card')

    taskCard.innerHTML = `<p class = "album-title" ${album.title}</p>
    <p class = "album-artist" ${album.artist}</p>
    <p class = "album-genre" ${album.genre}</p>
    <p class = "album-pressing" ${album.pressing}</p>
    <p class = "album-color"${album.color}</p>
    `
    collectionContainer.appendChild(albumCard)
};

function displayCollection (arr) {
    collectionContainer.innerHTML = ``
    for (let i=0; i<arr.length;i++){
        createAlbumCard(arr[i])
    }
}

function addAlbumForm () {
    imgContainer.remove()
    btnContainer.remove()
    document.getElementById('form-container').hidden = false
}

function showCollection () {
    imgContainer.remove()
    btnContainer.remove()
    document.getElementById('collection-continer').hidden=false;
    getAllAlbums()
}

addtoCollectionBtn.addEventListener("click", addAlbumForm)
viewCollectionBtn.addEventListener("click", showCollection)