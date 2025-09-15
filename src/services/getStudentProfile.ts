// services/getInstructorProfile.ts
export const getsStudentProfile = async () => {
  try {
    const res = await fetch("/api/student/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ensure cookies are sent
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage || "Failed to fetch student profile");
    }

    return res.json();
  } catch (err) {
    throw err;
  }
};
