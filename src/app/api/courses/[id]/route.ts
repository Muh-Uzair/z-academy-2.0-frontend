import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  console.log("Course id --------------------------------");
  console.log(id);

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
