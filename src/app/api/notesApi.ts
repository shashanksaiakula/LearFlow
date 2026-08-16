import apiClient from "./apiClinet";
import { ENDPOINTS } from "./endpoint";
import { deleteNoteRequest, deleteNoteResponse, getNoteRequest, getNoteResponse, postEnrollRequest, postNoteRequest, postNoteResponse, updateNoteRequest, updateNoteResponse } from "./types";

export const getNotesAPi = (request: getNoteRequest) => {
    return apiClient.get<getNoteResponse>(`/course/${request.courseCode}/lesson/${request.lessonCode}${ENDPOINTS.NOTES}`)
}

export const postNotesApi = (req: postNoteRequest) => {
    return apiClient.post<postNoteResponse>(ENDPOINTS.NOTES, req)
}

export const updateNotesApi = (req: updateNoteRequest) => {
    return apiClient.put<updateNoteResponse>(`${ENDPOINTS.NOTES}/${req.id}` , req)
}

export const deleteNotesApi = (req: deleteNoteRequest) => {
    return apiClient.delete<deleteNoteResponse>(`${ENDPOINTS.NOTES}/${req.id}`)
}