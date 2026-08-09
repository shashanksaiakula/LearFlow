
import { Course } from "../models/course"
import { Lesson } from "../models/Lesson"
import { apiClient } from "./apiClinet"
import { ENDPOINTS } from "./endpoint"
import { getAllCoursesResponse, getInsructorRequest, getInsructorResponse, getLessonsByCourseCodeRequest, getLessonsByCourseCodeResponse, getReviewsRequest, getReviewsResponse } from "./types"

export const getAllCoursesData = ()=> {
    return apiClient.get<getAllCoursesResponse>(ENDPOINTS.GETALLCOURSES) 
}

export const getCourseByIdApi = (id : string) =>{
    console.log("courseCode api",id)
    return apiClient.get<Course>(`${ENDPOINTS.GETCOURSEBYID}/${id}`)
}

export const getLessonByCourseApi = (request : getLessonsByCourseCodeRequest) =>{
    return apiClient.get<getLessonsByCourseCodeResponse>(`${ENDPOINTS.GETLESSONSBYCOURSE}/${request.courseCode}`)
}
export const getInstructorInfoApi = (request : getInsructorRequest) =>{
    return apiClient.get<getInsructorResponse>(`${ENDPOINTS.GETINSTRUCTOR}/${request.name}`)
}
export const getReviewsApi = (request : getReviewsRequest) =>{
    return apiClient.get<getReviewsResponse>(`${ENDPOINTS.GETREWIVE}/${request.courseCode}`)
}