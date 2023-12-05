export async function GET() {
  const res = {
    "message":"Hello world"
  }

  return Response.json(res);
}
