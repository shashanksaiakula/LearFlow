import { Course } from "../../models/course";
import { EnrollmentStatus } from "../../models/Enrollment";
import { RootState } from "../store";

export interface CombinedCourse extends Course {
    progress: number;
    status: EnrollmentStatus;
}

export const selectEnrolledCourses = (state: RootState) => {
    const courses = state.courses.courses;
    const enrollments = state.enroll.enrollments;

    return courses?.filter(course =>
        enrollments?.some(
            enrollment =>
                enrollment.courseCode === course.courseCode
        )
    ) ?? [];
};

export const selectCombinedCourses = (
    state: RootState
): CombinedCourse[] => {

    const courses = state.courses.courses ?? [];
    const enrollments = state.enroll.enrollments ?? [];

    return courses
        .map((course) => {

            const enrollment = enrollments.find(
                (item) => item.courseCode === course.courseCode
            );

            if (!enrollment) {
                return null;
            }

            return {
                ...course,
                progress: enrollment.progress,
                status: enrollment.status,
            };
        })
        .filter(
            (course): course is CombinedCourse =>
                course !== null
        );
};

export const selectInProgressCourses = (
    state: RootState
): CombinedCourse[] => {

    const combinedCourses = selectCombinedCourses(state);

    return combinedCourses.filter(
        course => course.progress < 100
    );
};

export const selectCompletedCourses = (
    state: RootState
): CombinedCourse[] => {

    const combinedCourses = selectCombinedCourses(state);

    return combinedCourses.filter(
        course => course.progress == 100
    );
};

export const selectYetToEnrollCourses = (state: RootState) => {

    const courses = state.courses.courses;
    const enrollments = state.enroll.enrollments;

    return courses?.filter(course =>
        !enrollments?.some(
            enrollment =>
                enrollment.courseCode === course.courseCode
        )
    ) ?? [];
};