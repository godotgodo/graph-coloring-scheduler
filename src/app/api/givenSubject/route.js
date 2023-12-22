const connectDB = require("../../../config/db");
const GivenSubject = require("../../models/GivenSubject");
const Subject = require("../../models/Subject");

export async function GET() {
  await connectDB();
  const res = await GivenSubject.find().populate("subject");
  return Response.json(res, { status: 200 });
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { lecturer } = await Subject.findById(body.subject);
    body.lecturer = lecturer;
    const res = await GivenSubject.create(body);
    return Response.json(res, { status: 200 });
  } catch (e) {
    return Response.json(e, { status: 400 });
  }
}
