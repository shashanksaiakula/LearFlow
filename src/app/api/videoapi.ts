import apiClient from "./apiClinet"

export const getVideo = () => {
  return apiClient.get("/videos");
}