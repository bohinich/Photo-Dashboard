import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "49365626-6bf9b0bb5948f971197bdaec6";

const pixabayApi = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    },
})

export async function getImagesByQuery(query, page = 1, perPage = 15) {
    try {
        const response = await pixabayApi.get("", {
            params: {
                q: query,
                page: page,
                per_page: perPage,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);

        throw error;
    }
}