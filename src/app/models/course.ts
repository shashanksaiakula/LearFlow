export interface Course {
    id: number,
    title: string,
    description: string,
    duration: string,
}

export type GetAllCoursesResponse = Course[]; 