import { Category } from "../models/Category";
import { ContinueLearning } from "../models/ContinieLearning";
import { Course, GetAllCoursesResponse } from "../models/course";
import { Lesson } from "../models/Lesson";
import { Transcript } from "../models/Transcript";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
    token: string;
    // user: User;
}

export interface getAllCoursesResponse {
    cources : GetAllCoursesResponse
}

export interface homeResponse {
    continueLearning: ContinueLearning,
    categories : Category[],
    recommendedCourses : Course[]
}

export interface LessonByIdRequest{
    cousreId: number,
    lessonId : number
}

export interface LessonByIdResponse{
    lesson : Lesson
}

export interface TranscriptRequest{
    videoUrl : string
}

export interface TranscriptResponse{
    transcript : Transcript[]
}