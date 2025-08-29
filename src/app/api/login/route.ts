export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Your intentional error setup
  const res = await fetch(`${process.env.BACK_END_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  // Return error status instead of 200
  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Registration failed" }), {
      status: 400,
    });
  }

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: new Headers(res.headers),
  });
}
