const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const loader = document.querySelector(".loader");

let currentQuery = "";

let currentPage = 1;

const perPage = 15;

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const query = event.target.elements.query.value.trim();

    if (!query) {
        alert('Please enter a search query')
        return
    }

    currentQuery = query;

    currentPage = 1;

    clearGallery();

    showLoader();

    console.log("Search for:", currentQuery);
    console.log("Page:", currentPage);
}

function clearGallery() {
    gallery.innerHTML = "";
}

function showLoader() {
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}

function showLoadMore() {
    loadMoreBtn.classList.remove("hidden");
}

function hideLoadMore() {
    loadMoreBtn.classList.add("hidden");
}

loadMoreBtn.addEventListener("click", handleLoadMore);

function handleLoadMore() {
    currentPage += 1;

    console.log("Load more clicked");
    console.log("Current page:", currentPage);
}