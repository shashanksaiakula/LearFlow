import { Lesson } from "./Lesson";

export interface Course {
    id: number,
    title: string,
    description: string,
    duration: string,
    rating: string,
    instructor: string,
    totalLessons: number,
    level: string,
    thumbnail: string,
    category : string
}

export type GetAllCoursesResponse = Course[]; 
