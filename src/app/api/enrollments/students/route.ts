import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  console.log(jwt);

  // Your intentional error setup
  const res = await fetch(`${process.env.BACK_END_URL}/enrollments/student`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
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
