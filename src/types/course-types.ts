export interface ICourse {
  title: string;
  description?: string;
  level: "beginner" | "intermediate" | "advanced";

  instructorId: string;
  enrolledStudentsIds: string[];

  price: number;
  enrollmentCount: number;

  thumbnail?: string;
  rating: number;
}
