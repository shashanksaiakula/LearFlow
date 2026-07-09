
import { apiClikent2 } from "./apiClinet"
import { ENDPOINTS } from "./endpoint"
import { getAllCoursesResponse } from "./types"

export const getAllCoursesData = ()=> {
    return apiClikent2.get<getAllCoursesResponse>(ENDPOINTS.GETALLCOURSES) 
}