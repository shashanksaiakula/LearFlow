import { apiClient } from "./apiClinet";
import { ENDPOINTS } from "./endpoint";
import { TranscriptRequest, TranscriptResponse } from "./types";

export function getTranscript(body : TranscriptRequest){
    const response = apiClient.post<TranscriptResponse>(ENDPOINTS.TRANSCRIPT, body)
    return response
} 