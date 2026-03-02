import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = null;

export function clearGallery(gallery) {
    gallery.innerHTML = "";
}

export function createGalleryMarkup(images) {
    return images
        .map(
            image => `
            <a href="${image.largeImageURL}" class="gallery-item">
                <img 
                    src="${image.webformatURL}" 
                    alt="${image.tags}" 
                    loading="lazy"
                />
            </a>
            `
        )
        .join("");
}

export function appendImages(gallery, markup) {
    gallery.insertAdjacentHTML("beforeend", markup)

    if (!lightbox) {
        lightbox = new SimpleLightbox(".gallery a", {
            captionsData: "alt",
            captionDelay: 250,
        });
    } else {
        lightbox.refresh();
    }
}