
import { Course } from "../models/course"
import { apiClient } from "./apiClinet"
import { ENDPOINTS } from "./endpoint"
import { getAllCoursesResponse } from "./types"

export const getAllCoursesData = ()=> {
    return apiClient.get<getAllCoursesResponse>(ENDPOINTS.GETALLCOURSES) 
}

export const getCourseByIdApi = (id : number) =>{
    return apiClient.get<Course>(`${ENDPOINTS.GETCOURSEBYID}/${id}`)
}