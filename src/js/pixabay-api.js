import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "49365626-6bf9b0bb5948f971197bdaec6";


export async function getImagesByQuery(query, page = 1, perPage = 15) {
    const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page,
            per_page: perPage,
        },
    })

    return response.data
}