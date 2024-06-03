export function searchImage(searchQuery) {
    const BASE_URL = "https://pixabay.com";
    const END_POINT = "/api/";
    const params = new URLSearchParams({
        key: "44052553-0e6a302568f711546d3ca79ba",
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });

    const url = `${BASE_URL}${END_POINT}?${params}`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                return Promise.reject(new Error(`HTTP error! status: ${response.status}`));
            }
            return response.json();
        })
        .catch(error => {
            console.error(`HTTP error! status: ${error.message}`);
            return Promise.reject(new Error(`HTTP error! status: ${error.message}`));
        });
}
