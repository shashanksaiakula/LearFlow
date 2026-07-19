import { apiClikent2 } from "./apiClinet";
import { ENDPOINTS } from "./endpoint";
import { TranscriptRequest, TranscriptResponse } from "./types";

export function getTranscript(body : TranscriptRequest){
    const response = apiClikent2.post<TranscriptResponse>(ENDPOINTS.TRANSCRIPT, body)
    return response
} 