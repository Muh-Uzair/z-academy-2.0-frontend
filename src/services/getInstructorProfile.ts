// services/getInstructorProfile.ts
export const getInstructorProfile = async () => {
  try {
    const res = await fetch("/api/instructor/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ensure cookies are sent
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage || "Failed to fetch instructor profile");
    }

    return res.json();
  } catch (err) {
    console.error("Error in getInstructorProfile:", err);
    throw err;
  }
};
