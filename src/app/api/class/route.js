import classController from "@/app/controllers/ClassController";

export async function GET() {
  const res = await classController.getAll();
  return res;
}

export async function POST(req) {
  const res = await classController.insert(await req.json());
  return res;
}

export async function PUT(req) {
  const { id, ...data } = await req.json();
  const res = await classController.update(id, data);
  return res;
}

export async function DELETE(req) {
  const { id } = await req.json();
  const res = await classController.delete(id);
  return res;
}
