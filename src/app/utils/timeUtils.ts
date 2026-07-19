export const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
};

export const parseTimeToSeconds = (timeString: string): number => {
  if (!timeString) return 0;

  // Split the string by colons (e.g., "01:23:45" -> ["01", "23", "45"])
  const parts = timeString.split(':').map(Number);

  // If any part failed to convert to a valid number, return 0 safely
  if (parts.some(isNaN)) return 0;

  if (parts.length === 3) {
    // Format is HH:MM:SS
    const [hrs, mins, secs] = parts;
    return hrs * 3600 + mins * 60 + secs;
  } 
  
  if (parts.length === 2) {
    // Format is MM:SS
    const [mins, secs] = parts;
    return mins * 60 + secs;
  }

  // If there's only one part (just seconds)
  return parts[0] || 0;
};
