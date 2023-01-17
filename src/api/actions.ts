import axios, {AxiosResponse} from "axios";
import { FormDataState } from "../types";
import { ApiResponse, GetAllReponse } from "./types";
import { urls } from "./urls";

export const getAllThemes: () => Promise<GetAllReponse[] | unknown> = async () => {
    try {
        const response: GetAllReponse[] = (await axios.get(urls.getAll)).data.data;
        console.log(response)
        return response
    } catch (error) {
    return error
    }
} 

export const deleteTheme = async (id: string) => {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.delete(`${urls.delete}?id=${id}`) 
        return response.data
    } catch (error) {
    return error
    }
} 

export const createTheme = async (data: FormDataState) => {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.post(urls.create, data) 
        return response.data
    } catch (error) {
    return error
    }
} 


export const editTheme = async (data: FormDataState) => {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.put(urls.edit, data) 
        return response.data
    } catch (error) {
    return error
    }
} 