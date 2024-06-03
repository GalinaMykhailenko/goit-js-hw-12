export function singleImageTemplate(image) {
    return `
        <li class="gallery-item">
            <a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-item-image">
                <div class="info">
                    <p class="info-title">Likes: <span class="info-value">${image.likes}</span></p>
                    <p class="info-title">Views: <span class="info-value">${image.views}</span></p>
                    <p class="info-title">Comments: <span class="info-value">${image.comments}</span></p>
                    <p class="info-title">Downloads: <span class="info-value">${image.downloads}</span></p>
                </div>
            </a>
        </li>
    `;
}

export function imageTemplate(images) {
    return images.map(singleImageTemplate).join('');
}