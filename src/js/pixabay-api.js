import axios from "axios";

export async function searchImage(searchQuery, page = 1) {
    const BASE_URL = "https://pixabay.com";
    const END_POINT = "/api/";
    const params = {
        key: "44052553-0e6a302568f711546d3ca79ba",
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 15,
    };

    try {
        const response = await axios.get(`${BASE_URL}${END_POINT}`, { params });
        return response.data;
    } catch (error) {
        console.error(`HTTP error! status: ${error.response?.status || error.message}`);
        throw new Error(`HTTP error! status: ${error.response?.status || error.message}`);
    }
}