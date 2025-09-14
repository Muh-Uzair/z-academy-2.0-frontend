export async function POST() {
  const res = await fetch(`${process.env.BACK_END_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Logout failed" }), {
      status: res.status,
    });
  }

  // Backend clears cookies, no body expected
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: new Headers(res.headers), // includes Set-Cookie
  });
}
