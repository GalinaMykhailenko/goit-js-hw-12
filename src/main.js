import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { searchImage } from "./js/pixabay-api.js";
import { imageTemplate } from "./js/render-functions.js";

const formEl = document.querySelector(".form");
const imagesGallery = document.querySelector(".gallery");
const loader = document.querySelector("#loader");

formEl.addEventListener("submit", event => {
    event.preventDefault();

    const searchQuery = event.target.elements.searchQuery.value.trim();

    if (!searchQuery) {
        iziToast.error({
            title: 'Error',
            message: 'Search query cannot be empty!',
        });
        return;
    }

    loader.classList.remove('hidden');
    loader.classList.add('hidden');
    imagesGallery.innerHTML = '';

    searchImage(searchQuery)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.warning({
                    title: 'Warning',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
            } else {
                const markup = imageTemplate(data.hits);
                imagesGallery.innerHTML = markup;
                new SimpleLightbox('.gallery a', {
                    captionsData: "alt",
                    captionsDelay: 250
                }).refresh();

                event.target.elements.searchQuery.value = '';
            }
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: error.message,
            });
        })
        .finally(() => {
            loader.classList.add('hidden');
        });
});