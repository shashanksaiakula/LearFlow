import apiClient from "./apiClinet";
import { ENDPOINTS } from "./endpoint";
import {  getEnrollResponse, postEnrollRequest, postEnrollResponse, updateEnrollmentRequest, updateEnrollmentResponse } from "./types";

export function enrollToCousre(
    request : postEnrollRequest
){
    return apiClient.post<postEnrollResponse>(`${ENDPOINTS.ENROLLMENT}/${request.courseCode}/${request.lessonCode}`)
}

export function getAllENrolleCousrses(){
    return apiClient.get<getEnrollResponse>(ENDPOINTS.ENROLLMENT)
}

export function updateEnrollment(req: updateEnrollmentRequest){
    return apiClient.put<updateEnrollmentResponse>(`${ENDPOINTS.ENROLLMENT}/${req.id}`,req)
}