import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { formData } = await request.json();
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  // Forward request to backend
  const res = await fetch(`${process.env.BACK_END_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(formData),
    credentials: "include", // important for cookies
  });

  // Stream backend response directly to client
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: new Headers(res.headers), // includes Set-Cookie
  });
}
