import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  // Forward request to backend
  const res = await fetch(`${process.env.BACK_END_URL}/courses/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: new Headers(res.headers),
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const { formData } = await request.json();
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  // Forward request to backend
  const res = await fetch(`${process.env.BACK_END_URL}/courses/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(formData),
    credentials: "include", // important for cookies
  });

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: new Headers(res.headers),
  });
}
