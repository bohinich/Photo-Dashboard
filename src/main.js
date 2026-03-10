import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api";
import { createGalleryMarkup, appendImages, clearGallery } from "./js/render-functions";
import { state } from "./js/state";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const loader = document.querySelector(".loader");

const navButtons = document.querySelectorAll(".nav-btn");
const filterButtons = document.querySelectorAll(".filter-btn");

loadMoreBtn.classList.add("hidden");

form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleSubmit(event) {
    event.preventDefault();

    const query = event.target.elements.query.value.trim();

    if (!query) {
        iziToast.warning({
            message: "Please enter a search query",
            position: "topRight",
        });
        return;
    }

    state.query = query;
    state.page = 1;
    state.images = [];

    clearGallery(gallery);
    showLoader();

    try {
        const data = await getImagesByQuery(state.query, state.page, state.perPage);

        if (data.hits.length === 0) {
            iziToast.warning({
                message: "No images found",
                position: "topRight",
            });
            return;
        }

        state.images = data.hits;
        state.totalHits = data.totalHits;

        renderGallery();
        checkLoadMoreVisibility();

    } catch {
        iziToast.warning({
            message: "Something went wrong. Please try again",
            position: "topRight",
        });
    } finally {
        hideLoader();
    }
}

async function handleLoadMore() {
    state.page += 1;

    try {
        showLoader();
        loadMoreBtn.disabled = true;

        const data = await getImagesByQuery(state.query, state.page, state.perPage);

        state.images = [...state.images, ...data.hits];

        renderGallery();
        checkLoadMoreVisibility();

    } catch {
        iziToast.warning({
            message: "Error loading more images",
            position: "topRight",
        });
    } finally {
        hideLoader();
        loadMoreBtn.disabled = false;
    }
}

function renderGallery() {
    clearGallery(gallery);

    let imagesToRender = [...state.images];

    if (state.currentView === "favorites") {
        imagesToRender = imagesToRender.filter(img =>
            state.favorites.includes(img.id)
        );
    }

    if (state.currentFilter === "approved") {
        imagesToRender = imagesToRender.filter(img => img.likes > 100);
    }

    if (state.currentFilter === "rejected") {
        imagesToRender = imagesToRender.filter(img => img.likes <= 100);
    }

    const markup = createGalleryMarkup(imagesToRender, state.favorites);
    appendImages(gallery, markup);
}

gallery.addEventListener("click", e => {
    const btn = e.target.closest(".fav-btn");
    if (!btn) return;

    const id = Number(btn.dataset.id);

    if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
    } else {
        state.favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(state.favorites));

    renderGallery();
});

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        navButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        state.currentView = btn.dataset.view;
        renderGallery();
    });
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        state.currentFilter = btn.dataset.filter;
        renderGallery();
    });
});

function checkLoadMoreVisibility() {
    const loadedImages = state.page * state.perPage;

    if (loadedImages >= state.totalHits) {
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

document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
        state.favorites = JSON.parse(saved);
    }
});