export async function POST(request: Request) {
  const { name, email, password, institute, specialization, experience } =
    await request.json();

  const res = await fetch(
    `${process.env.BACK_END_URL}/auth/instructor/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        institute,
        specialization,
        experience,
      }),
    },
  );

  // Agar backend ne error bheja
  if (!res.ok) {
    const errorText = await res.text(); // backend ka raw error text
    return new Response(errorText, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    });
  }

  // Success case me backend ka exact response forward kar do
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  });
}
