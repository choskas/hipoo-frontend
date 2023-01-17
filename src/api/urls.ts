import { Urls } from "./types"

const BASE_URL: string = 'https://hipoo-backend.onrender.com/api'
export const urls: Urls = {
    getAll: `${BASE_URL}/themes`,
    getById: `${BASE_URL}/theme`,
    create: `${BASE_URL}/create-theme`,
    delete: `${BASE_URL}/delete-theme`,
    edit: `${BASE_URL}/edit-theme`,
}