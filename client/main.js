const collectionContainer = document.querySelector("#collection-continer")

const baseURL = `http://localhost:3004`

const collectionCallback = ({ data: collection }) => displayCollection(collection)
const errCallback = err => console.log(err)

document.getElementById('form-container').hidden = true;
document.getElementById('collection-continer').hidden=true;


const viewCollectionBtn = document.querySelector(".btn-1")
const addtoCollectionBtn = document.querySelector(".btn-2")

const btnContainer = document.querySelector(".btn-container");
const imgContainer = document.querySelector(".img-container");

const formContainer = document.querySelector("#form-container")


addAlbumBtn = document.querySelector(".add-album-btn")


function addAlbumForm () {
    imgContainer.remove()
    btnContainer.remove()
    document.getElementById('form-container').hidden = false
}

function showCollection () {
    imgContainer.remove()
    btnContainer.remove()
    document.getElementById('collection-continer').hidden=false;
}

addtoCollectionBtn.addEventListener("click", addAlbumForm)
viewCollectionBtn.addEventListener("click", showCollection)