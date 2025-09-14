export const getInstructorStudents = async () => {
  const res = await fetch("/api/instructor/students", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch students");
  }

  return data;
};
