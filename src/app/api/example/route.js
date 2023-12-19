//const connectDB = require('../../../config/db');

export async function GET() {
  //await connectDB();
  const res = {
    "message":"It changed"
  }
  return Response.json(res);
}
