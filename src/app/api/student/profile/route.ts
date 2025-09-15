import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const res = await fetch(`${process.env.BACK_END_URL}/users/student/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    credentials: "include",
  });

  // Agar backend se error aaya to wahi return karo
  if (!res.ok) {
    const errorMessage = await res.text(); // backend ka raw message
    return new Response(errorMessage, {
      status: res.status,
      statusText: res.statusText,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: new Headers(res.headers),
  });
}

export async function PATCH(request: NextRequest) {
  const { formData } = await request.json();
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  // Forward request to backend
  const res = await fetch(`${process.env.BACK_END_URL}/users/student/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  if (!res.ok) {
    const errorMessage = await res.text(); // backend ka raw error
    return new Response(errorMessage, {
      status: res.status,
      statusText: res.statusText,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: new Headers(res.headers),
  });
}
