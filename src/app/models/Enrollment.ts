export type EnrollmentStatus = 'active' | 'completed' | 'cancelled';

export interface Enrollment {
  _id: string;
  userId: string;
  courseCode: string;
  status: EnrollmentStatus;
  progress: number;
  enrolledAt: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  currentLessonPosition : number;
  currentLessonCode : string
  completedLessonCode : []
}
