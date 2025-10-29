export async function POST(request: Request) {
  const body = await request.json();
  const sessionToken = body.sessionToken as string;
  const expiresAt = body.expiresAt as string;
  const role = body.role as string;

  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      }
    );
  }
  const expiresDate = new Date(expiresAt).toUTCString();
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`
  );
  headers.append(
    "Set-Cookie",
    `userRole=${role}; Path=/; Expires=${expiresDate}; SameSite=Lax; Secure`
  );

  return Response.json(body, {
    status: 200,
    headers: headers,
  });
}
