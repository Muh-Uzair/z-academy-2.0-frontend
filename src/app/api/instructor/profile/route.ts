import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  console.log(jwt);

  const res = await fetch(
    `${process.env.BACK_END_URL}/users/instructor/profile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      credentials: "include",
    },
  );

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
