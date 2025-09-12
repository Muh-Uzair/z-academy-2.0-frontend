export const getAllEnrollmentsStudent = async () => {
  const res = await fetch("/api/enrollments/students", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Fetching all enrollments student failed");
  }

  return await res.json();
};
