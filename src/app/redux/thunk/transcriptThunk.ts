import { createAsyncThunk } from "@reduxjs/toolkit";
import { TranscriptRequest, TranscriptResponse } from "../../api/types";
import { getTranscript } from "../../api/transcriptApi";
import axios from "axios";

export const fetchTranscript = createAsyncThunk<
     TranscriptResponse,
     TranscriptRequest,
     {
          rejectValue: string
     }
>(
     "transcript/fetchTranscript",
     async (request, { rejectWithValue }) => {
          try {

               const response = await getTranscript(request)
               console.log("response is " + JSON.stringify(response))
               return response.data
          } catch (error) {
               if(axios.isAxiosError(error)){
                    return rejectWithValue(
                     error.response?.data?.error ?? 
                    "Unable to fetch transcript"
                )
               }
               console.log("leson error is "+ error?.message)
            return rejectWithValue("Something went wrong")
          }
     }
)