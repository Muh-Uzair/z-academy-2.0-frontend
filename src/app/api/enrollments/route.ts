import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { courseId } = await request.json();
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const res = await fetch(`${process.env.BACK_END_URL}/enrollments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ courseId }),
    credentials: "include",
  });

  // If backend returned error, forward it to client
  if (!res.ok) {
    const errorBody = await res.text(); // use text() to handle both JSON and plain text
    return new Response(errorBody, {
      status: res.status,
      statusText: res.statusText,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/json",
      },
    });
  }

  // Forward success response
  const body = await res.text(); // again, use text() to avoid stream lock
  return new Response(body, {
    status: res.status,
    statusText: res.statusText,
    headers: {
      "Content-Type": res.headers.get("content-type") || "application/json",
    },
  });
}
