const prev = document.querySelector("#previous-arrow")
const next = document.querySelector("#next-arrow")
const mainImg = document.querySelector("#main-image")
const thumbnailImages = document.querySelectorAll(".thumbnail")

let viewImages = false
let imageIndex = 1
const imageCount = 4

function setImageIndex(index) {
    // Index must be between 1 and imageCount
    if (index < 1 || index > imageCount) {
        return
    }
    imageIndex = index
    mainImg.setAttribute("src", `images/image-product-${imageIndex}.jpg`)

    // Current image thumbnail is highlighted
    thumbnailImages.forEach((img, index) => {
        index === imageIndex - 1 ? img.classList.add("active") : img.classList.remove("active")
    })
}

function setImageView(viewImages) {
    document.querySelector("#image-component").style.display = viewImages ? "block" : "none";
}

// Decrease and increase image index
prev.addEventListener("click", () => setImageIndex(imageIndex - 1))
next.addEventListener("click", () => setImageIndex(imageIndex + 1))

const closeButton = document.querySelector("#close-button")
closeButton.addEventListener("click", () => {
    setImageView(false)
    console.log("Image view closed")
})

// Thumbnail image click events
thumbnailImages.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        setImageIndex(index + 1)
    })
})