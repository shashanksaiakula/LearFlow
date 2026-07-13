import { Lesson } from "./Lesson";

export interface Course {
    id: number,
    title: string,
    description: string,
    duration: string,
    rating : string,
    instructor: string,
    lessons : Lesson[]
}

export type GetAllCoursesResponse = Course[]; 
