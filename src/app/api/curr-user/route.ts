import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  // Call your Express backend
  const res = await fetch(`${process.env.BACK_END_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  // Return error status instead of 200
  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: "Fetch current user failed" }),
      {
        status: 400,
      },
    );
  }

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: new Headers(res.headers),
  });
}
