const connectDB = require("../../../config/db");
const Subject = require("../../models/Subject");

export async function GET() {
  await connectDB();
  const res = await Subject.find();
  return Response.json(res, { status: 200 });
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const res = await Subject.create(body);
    return Response.json(res, { status: 200 });
  } catch (e) {
    Response.json(e, { status: 400 });
  }
}
