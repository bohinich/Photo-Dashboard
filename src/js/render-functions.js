export function createGalleryMarkup(images) {
    return images
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) => {
                return `
                    <li class="gallery-item">
                        <a href="${largeImageURL}" class="gallery-link">
                            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image"/>
                        </a>

                        <div class="info">
                            <p><b>Likes</b> ${likes}</p>
                            <p><b>Views</b> ${views}</p>
                            <p><b>Comments</b> ${comments}</p>
                            <p><b>Downloads</b> ${downloads}</p>
                        </div>
                    </li>`
            }
        )
        .join("")
}

export function appendImages(galleryEl, markup) {
    galleryEl.insertAdjacentHTML("beforeend", markup)
}

export function clearGallery(galleryEl) {
    galleryEl.innerHTML = ""
}