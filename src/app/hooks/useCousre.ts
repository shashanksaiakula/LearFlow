import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useEffect } from "react"
import { requestCoueseById } from "../redux/slices/courseSlicer"

function useCousre(courseId : number){

    const dispatch = useDispatch()
      const {courses, error, loading} = useSelector((state : RootState) => state.courses)

  useEffect(()=>{
    dispatch(requestCoueseById(courseId))
},[courseId])

return {
    courses,
    error,
    loading,
}
}
export default useCousre