import { apiClikent2 } from "./apiClinet"
import { ENDPOINTS } from "./endpoint"
import { homeResponse } from "./types"

export const home = () => {
    return apiClikent2.get<homeResponse>(ENDPOINTS.HOME)
}