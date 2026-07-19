import { apiClikent2 } from "./apiClinet";
import { ENDPOINTS } from "./endpoint";
import { LessonByIdRequest, LessonByIdResponse } from "./types";

export function getLessonByIdApi(request : LessonByIdRequest){
    return apiClikent2.get<LessonByIdResponse>(`${ENDPOINTS.GETLESSSONBYID}/${request.cousreId}/lesson/${request.lessonId}`)
}
