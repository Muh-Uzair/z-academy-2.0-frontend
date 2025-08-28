export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // Your intentional error setup
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

  // Return error status instead of 200
  if (!res.ok) {
    console.log(data.message);
    return new Response(
      JSON.stringify({ error: "Registration failed", message: data.message }),
      { status: 400 }, // This will trigger onError
    );
  }

  return new Response(JSON.stringify(data));
}
