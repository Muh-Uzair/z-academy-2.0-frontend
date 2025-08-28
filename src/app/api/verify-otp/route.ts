export async function POST(request: Request) {
  const { otp } = await request.json();

  // Call your Express backend
  const res = await fetch(
    `${process.env.BACK_END_URL}/users/verify-otp?userType=student`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    },
  );

  const data = await res.json();

  return new Response(JSON.stringify(data));
}
