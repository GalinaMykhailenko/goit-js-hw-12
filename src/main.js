import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { searchImage } from "./js/pixabay-api.js";
import { imageTemplate } from "./js/render-functions.js";

const formEl = document.querySelector(".form");
const imagesGallery = document.querySelector(".gallery");
const loader = document.querySelector("#loader");
const loadMoreBtn = document.querySelector("#load-more");

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

const lightbox = new SimpleLightbox('.gallery a', {
                captionsData: "alt",
                captionDelay: 250
            })

formEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    currentQuery = event.target.elements.searchQuery.value.trim();

    if (!currentQuery) {
        iziToast.error({
            title: 'Error',
            message: 'Search query cannot be empty!',
        });
        return;
    }

    currentPage = 1;
    imagesGallery.innerHTML = '';
    loadMoreBtn.classList.add('hidden');
    loader.classList.remove('hidden');

    try {
        const data = await searchImage(currentQuery, currentPage);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.warning({
                title: 'Warning',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
        } else {
            const markup = imageTemplate(data.hits);
            imagesGallery.innerHTML = markup;
            lightbox.refresh();

            if (data.hits.length < totalHits) {
                loadMoreBtn.classList.remove('hidden');
            }

            event.target.elements.searchQuery.value = '';
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: error.message,
        });
    } finally {
        loader.classList.add('hidden');
    }
});

loadMoreBtn.addEventListener("click", async () => {
    currentPage += 1;
    loader.classList.remove('hidden');

    try {
        const data = await searchImage(currentQuery, currentPage);
        const markup = imageTemplate(data.hits);
        imagesGallery.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();

        const loadedImagesCount = imagesGallery.querySelectorAll('.gallery-item').length;
        if (loadedImagesCount >= totalHits) {
            loadMoreBtn.classList.add('hidden');
            iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
            });
        }

        const galleryItemHeight = imagesGallery.firstElementChild.getBoundingClientRect().height;
        window.scrollBy({
            top: galleryItemHeight * 2,
            behavior: 'smooth'
        });
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: error.message,
        });
    } finally {
        loader.classList.add('hidden');
    }
});