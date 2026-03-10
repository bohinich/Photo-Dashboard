import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = null;

export function clearGallery(gallery) {
    gallery.innerHTML = "";
}

function likeIcon() {
  return `
    <svg 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="white" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
    </svg>
  `;
}

function viewIcon() {
  return `
    <svg 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="white" 
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `;
}

function starIcon() {
  return `
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon points="12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9"/>
    </svg>
  `;
}

export function createGalleryMarkup(images, favorites) {
    return images
        .map(image => {
            const isFav = favorites.includes(image.id);

            return `
                <div class="card">
                    <a href="${image.largeImageURL}" class="gallery-item">
                        <img 
                            src="${image.webformatURL}" 
                            alt="${image.tags}" 
                            loading="lazy"
                        />
                    </a>

                    <div class="card-info">
                        <div class="info-item">
                            ${likeIcon()}
                            <span>${image.likes}</span>
                        </div>

                        <div class="info-item">
                            ${viewIcon()}
                            <span>${image.views}</span>
                        </div>
                    </div>

                    <button 
                        class="fav-btn ${isFav ? "active" : ""}" 
                        data-id="${image.id}">
                        ${starIcon()}
                    </button>

                </div>`;
        })
        .join("");
}

export function appendImages(gallery, markup) {
    gallery.insertAdjacentHTML("beforeend", markup);

    if (!lightbox) {
        lightbox = new SimpleLightbox(".gallery .gallery-item", {
            captionsData: "alt",
            captionDelay: 250,
        });
    } else {
        lightbox.refresh();
    }
}