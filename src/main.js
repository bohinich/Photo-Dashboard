import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImagesByQuery } from "./js/pixabay-api";
import { createGalleryMarkup, appendImages, clearGallery, } from "./js/render-functions";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const loader = document.querySelector(".loader");

let currentQuery = "";
let currentPage = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const query = event.target.elements.query.value.trim();

    if (!query) {
        iziToast.warning({
            message: "Please enter a search query",
            position: "topRight",
        });
        return
    }

    currentQuery = query;
    currentPage = 1;
    totalHits = 0;

    clearGallery(gallery);
    hideLoader();

    try {
        showLoader();

        const data = await getImagesByQuery(currentQuery, currentPage, perPage);

        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.warning({
                message: "No images found",
                position: "topRight",
            });
            return
        }

        const markup = createGalleryMarkup(data.hits);
        appendImages(gallery, markup);

        checkEndOfCollection();
    } catch (error) {
        iziToast.warning({
            message: "Something went wrong. Please try again",
            position: "topRight",
        });
    } finally {
        hideLoader()
    }
}

loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleLoadMore() {
    currentPage += 1;

    try {
        showLoader

        const data = await getImagesByQuery(currentQuery, currentPage, perPage);

        const markup = createGalleryMarkup(data.hits);
        appendImages(gallery, markup);

        checkEndOfCollection();

        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
    } catch (error) {
        iziToast.warning({
            message: "Error loading more images",
            position: "topRight",
        });
    } finally {
        hideLoader();
    }
}

function checkEndOfCollection() {
    const loadedImages = currentPage * perPage;

    if (loadedImages > totalHits) {
        hideLoadMore();
        iziToast.warning({
            message: "You've reached the end of the results",
            position: "topRight",
        });
    } else {
        showLoadMore();
    }
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