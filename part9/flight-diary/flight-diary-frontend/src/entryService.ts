import axios from "axios";
import { DiaryEntry, NewEntry } from "./types";


const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = async () => {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
}

export const createNewEntry = async (object: NewEntry) => {

    try {
        const response = await axios.post<DiaryEntry>(baseUrl, object);
        return response.data;
    } catch(error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log(error.response.data)
            throw new Error(`${error.response.data || "Failed to add entry"}`);
          }
          throw new Error("An unexpected error occurred.");
      
    }
   
}