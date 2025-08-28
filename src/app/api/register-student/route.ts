export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // Call your Express backend
  const res = await fetch(
    `${process.env.BACK_END_URL}/users/student/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    },
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
