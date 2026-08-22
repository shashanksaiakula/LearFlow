import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react"
import { requestCourseById } from "../redux/slices/courseSlicer"
import { fetchCourseInstructor, fetchCourseReviews, fetchLessonsByCourse } from "../redux/thunk/coursesThunk"

function useCousre(courseId : string){

    const dispatch = useDispatch<AppDispatch>()
      const {course, error, loading,lessons, reviews, instructor} = useSelector((state : RootState) => state.courses)

  useEffect(()=>{
    if (!courseId) return;
    dispatch(requestCourseById(courseId))
    dispatch(fetchLessonsByCourse({courseCode: courseId}))
    dispatch(fetchCourseReviews({courseCode: courseId}))
},[courseId,dispatch])

useEffect(()=>{
    if(course?.instructor){
      dispatch(fetchCourseInstructor({name : course?.instructor}))
    }
},[course?.instructor])
return {
    course,
    error,
    loading,
    lessons,
    instructor,
    reviews
}
}
export default useCousre