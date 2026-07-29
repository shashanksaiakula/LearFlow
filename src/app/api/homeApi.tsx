import { apiClient } from "./apiClinet"
import { ENDPOINTS } from "./endpoint"
import { homeResponse } from "./types"

export const home = () => {
    return apiClient.get<homeResponse>(ENDPOINTS.HOME)
}