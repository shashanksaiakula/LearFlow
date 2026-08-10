import apiClient from "./apiClinet"
import { ENDPOINTS } from "./endpoint"
import { addBookmaekRequest, addBookmarkResponse, deleteBookmarkRequest, getBookmarkResponse } from "./types"

export const addtoBookmarkApi = (request: addBookmaekRequest) => {
    return apiClient.post<addBookmarkResponse>(`${ENDPOINTS.BOOKMARK}/${request.courseCode}`)
}
export const getBookmarkApi = () => {
    return apiClient.get<getBookmarkResponse>(ENDPOINTS.BOOKMARK)
}

export const deleteBookmarkApi = (request: deleteBookmarkRequest) => {
    return apiClient.delete<addBookmarkResponse>(`${ENDPOINTS.BOOKMARK}/${request.id}`)
}