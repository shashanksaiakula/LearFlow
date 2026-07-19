import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import type { AppDispatch, RootState } from '../redux/store';
import { fetchTranscript } from '../redux/thunk/transcriptThunk';


export function useTranscript(videoUrl: string, currentTimeStamp: number) {
  const dispatch = useDispatch<AppDispatch>();
  
  const { loading, transcript, error } = useSelector(
    (state: RootState) => state.transcript
  );
  useEffect(() => {
    if (!videoUrl) return;
    
    dispatch(fetchTranscript({ videoUrl }));
  }, [dispatch, videoUrl]);


  const activeIndex = useMemo(() => {
    const lines = transcript?.transcript;
    if (!lines?.length) return -1;

    return lines.findIndex(
      (item) => currentTimeStamp >= item.start && currentTimeStamp <= item.end
    );
  }, [currentTimeStamp, transcript]);

  return {
    loading,
    transcript,
    error,
    activeIndex,
  };
}

export default useTranscript;
