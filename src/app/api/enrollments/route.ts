import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { courseId } = await request.json();
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  // Your intentional error setup
  const res = await fetch(`${process.env.BACK_END_URL}/enrollments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ courseId }),
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
