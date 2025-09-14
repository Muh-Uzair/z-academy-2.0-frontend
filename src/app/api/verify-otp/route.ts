export async function POST(request: Request) {
  const { otp } = await request.json();

  // Forward request to backend
  const res = await fetch(
    `${process.env.BACK_END_URL}/auth/verify-otp?userType=student`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp }),
      credentials: "include", // important for cookies
    },
  );

  // Stream backend response directly to client
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: new Headers(res.headers), // includes Set-Cookie
  });
}
