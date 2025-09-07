export const getCourseOid = async (id: string) => {
  const res = await fetch(`/api/courses/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Fetching course failed");
  }

  return await res.json();
};
