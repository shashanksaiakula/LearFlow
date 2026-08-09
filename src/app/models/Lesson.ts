export interface Lesson {
  _id: string;
  courseCode: string;
  lessonCode: string;
  lessonNumber: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string; // Format: "MM:SS"
  order: number;
  isPreview: boolean;
  transcriptAvailable: boolean;
  notesAvailable: boolean;
  isCompleted: boolean;
  __v: number;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}
