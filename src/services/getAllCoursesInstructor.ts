export const getAllCoursesInstructor = async () => {
  const res = await fetch("/api/courses-instructor", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Fetching all courses failed");
  }

  return await res.json();
};
