collectionContainer = document.querySelector("#collection-container")

document.getElementById('form-container').hidden = true;
document.getElementById('collection-container').hidden =true;


const viewCollectionBtn = document.querySelector(".btn-1")
const addtoCollectionBtn = document.querySelector(".btn-2")

const btnContainer = document.querySelector(".btn-container");
const imgContainer = document.querySelector(".img-container");

const formContainer = document.querySelector("#form-container")


const addAlbumBtn = document.querySelector(".add-album-btn")

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

    axios.post("http://localhost:3004/submitalbum", body)
        .then((res) => {
            document.location.reload()
            console.log(res.data)
            if (res.status === 200) {
                alert ("Album added!")
            }})
            .catch((err) => {
            console.log(err)
        })
    }


function deleteAlbumCard(id) {
    axios.delete(`http://localhost:3004/albums/${id}`)
        .then((res) => {
        document.location.reload()
        console.log(res.data)
        if (res.status === 200) {
            alert ("Album deleted!")
        }})
         .catch((err) => {
        console.log(err)
    })
}

function getAllAlbums () {axios.get('http://localhost:3004/albums')
.then(res => {
    res.data.forEach(album => {
         let albumCard=  `<div class="album-card">
                <h2>${album.title}, ${album.artist}</h2>
                <p>Artist: ${album.artist}</p>
                <p>Genre: ${album.genre}</p>
                <p>Pressing: ${album.pressing}</p>
                <p>Album Color: ${album.color}</p>
                <button id = "delete-btn" onclick="deleteAlbumCard(${album['album_id']})">Delete</button>
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
    collectionContainer.hidden = false;
    getAllAlbums()
}




addtoCollectionBtn.addEventListener("click", addAlbumForm)
viewCollectionBtn.addEventListener("click", showCollection)
addAlbumBtn.addEventListener("click", submitAlbum)

