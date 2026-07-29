import { apiClient } from "./apiClinet";
import { ENDPOINTS } from "./endpoint";
import { LessonByIdRequest, LessonByIdResponse } from "./types";

export function getLessonByIdApi(request : LessonByIdRequest){
    return apiClient.get<LessonByIdResponse>(`${ENDPOINTS.GETLESSSONBYID}/${request.cousreId}/lesson/${request.lessonId}`)
}
