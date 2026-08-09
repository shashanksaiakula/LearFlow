import apiClient from "./apiClinet";
import { ENDPOINTS } from "./endpoint";
import {  getEnrollResponse, postEnrollRequest, postEnrollResponse } from "./types";

export function enrollToCousre(
    request : postEnrollRequest
){
    return apiClient.post<postEnrollResponse>(`${ENDPOINTS.ENROLLMENT}/${request.cousreCode}`)
}

export function getAllENrolleCousrses(){
    return apiClient.get<getEnrollResponse>(ENDPOINTS.ENROLLMENT)
}