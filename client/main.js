const collectionContainer = document.querySelector("#collection-continer")


const collectionCallback = ({ data: collection }) => displayCollection(collection)
const errCallback = err => console.log(err)

document.getElementById('form-container').hidden = true;
document.getElementById('collection-continer').hidden=true;


const viewCollectionBtn = document.querySelector(".btn-1")
const addtoCollectionBtn = document.querySelector(".btn-2")

const btnContainer = document.querySelector(".btn-container");
const imgContainer = document.querySelector(".img-container");

const formContainer = document.querySelector("#form-container")


const addAlbumBtn = document.querySelector(".add-album-btn")

const albumsContainer = document.querySelector(".collection-container")

    let title = document.querySelector("#album-title")
    let artist= document.querySelector("#artist")
    let genre= document.querySelector("#genre")
    let pressing= document.querySelector("#pressing")
    let color= document.querySelector("#color")


function submitAlbum(e) {
    e.preventDefault()

    let body = {
        title: title.value,
        artist: artist.value,
        genre: genre.value,
        pressing: pressing.value,
        color: color.value
       
    }

    axios.post("http://localhost:3004/albums", body)
        .then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                alert ("Album added!")
            }})
        .catch((err) => {
            console.log(err)
        })
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

function deleteAlbum (id) {
    axios.delete(`https://localhost:3004/albums`)
        .then(()=> getAllAlbums())
        .catch(err => console.log(err))
}


function getAllAlbums () {axios.get('http://localhost:3004/albums')
.then(res => {
    res.data.forEach(album => {
         let albumCard=  `<div class="album-card">
                <h2>${album.title} </h2>
                <p>Artist: ${album.artist}</p>
                <p>Genre: ${album.genre}</p>
                <p>Pressing: ${album.pressing}</p>
                <p>Album Color: ${album.color}</p>
                <button id = "delete-btn" onclick="deleteAlbum(${album['album_id']})">Delete</button>
                </div>
            `
        collectionContainer.innerHTML += albumCard
    })
})
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
addAlbumBtn.addEventListener("click", submitAlbum)