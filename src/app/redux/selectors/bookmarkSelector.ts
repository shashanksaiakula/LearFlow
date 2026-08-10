import { Course } from "../../models/course";
import { RootState } from "../store";

export interface CombinedCourse extends Course {
    bookmarkId: string;
    isBookmarked : boolean
}

export const selectBookmarkedCourses = (
    state: RootState
): CombinedCourse[] => {

    const courses = state.courses.courses ?? [];
    const bookmarked = state.bookmark.bookmarks ?? [];

    return courses
        .map((course) => {

            const bookmark = bookmarked.find(
                (item) => item.courseCode === course.courseCode
            );

            if (!bookmark) {
                return null;
            }

            return {
                ...course,
                bookmarkId: bookmark._id,
                isBookmarked : true
            };
        })
        .filter(
            (course): course is CombinedCourse =>
                course !== null
        );
};