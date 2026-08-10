import { Bookmark } from "../models/Bookmark";
import { Category } from "../models/Category";
import { ContinueLearning } from "../models/ContinieLearning";
import { Course, GetAllCoursesResponse } from "../models/course";
import { Enrollment } from "../models/Enrollment";
import { Instructor } from "../models/Instructor";
import { Lesson } from "../models/Lesson";
import { Review } from "../models/Reviews";
import { Transcript } from "../models/Transcript";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string,
    email: string;
    password: string;
}


export interface User {
    id: number;
    name: string;
    email: string;
    profileImage : string
    dateOfBirth : string
}

export interface LoginResponse {
    statusCode: number;
    success: boolean;
    message: string;
    token: string;
}
export interface UserRequest {
    success: string;
    user: User
}

export interface RegisterResponse {
    success: string;
    message: string;
}

export interface getAllCoursesResponse {
    success: boolean;
    data: Course[];
}
export interface getLessonsByCourseCodeResponse {
    success: boolean;
    lessons: Lesson[];
}

export interface getLessonsByCourseCodeRequest {
    courseCode : string
}

export interface getInsructorRequest{
    name : string
}

export interface getInsructorResponse{
    success : boolean,
    data : Instructor
}

export interface getReviewsRequest{
    courseCode : string
}

export interface getReviewsResponse{
    success : boolean,
    data : Review
}

export interface homeResponse {
    continueLearning: ContinueLearning,
    categories: Category[],
    recommendedCourses: Course[]
}

export interface LessonByIdRequest {
    cousreId: number,
    lessonId: number
}

export interface LessonByIdResponse {
    lesson: Lesson
}

export interface TranscriptRequest {
    videoUrl: string
}

export interface TranscriptResponse {
    transcript: Transcript[]
}

export interface ChangePasswordRequest {
    oldPassword : string,
    newPassword : string
}

export interface ChangePasswordResponse {
    success: string;
    message: string;
}

export interface LogoutResponse {
    success: string;
    message: string;
}

export interface EditPriofileRequest {
    name : string,
    profileImage : string
    dateOfBirth : string
}

export interface EditPriofileResponse {
    success: string;
    message: string;
    user : User
}

export interface postEnrollRequest {
    cousreCode : string
}

export interface postEnrollResponse {
    success : boolean,
    data : Enrollment
}

export interface getEnrollResponse {
    success : boolean,
    data : Enrollment[]
}

export interface addBookmaekRequest{
     courseCode : string
}
export interface addBookmarkResponse{
    success : boolean,
    data : Bookmark

}

export interface getBookmarkResponse {
    success : boolean,
    data : Bookmark[]
}

export interface deleteBookmarkRequest {
    id: string;
}

export interface deleteBookmarkResponse {
     success : boolean,
    data : any
}

