const connectDB = require("../../../config/db");
const GivenSubject = require("../../models/GivenSubject");

export async function GET() {
  await connectDB();
  const res = await GivenSubject.find();
  return Response.json(res, { status: 200 });
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const res = await GivenSubject.create(body);
    return Response.json(res, { status: 200 });
  } catch (e) {
    Response.json(e, { status: 400 });
  }
}
