export const getCurrUser = async () => {
  const res = await fetch(`/api/curr-user`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Fetch current user failed");
  }

  return await res.json();
};
