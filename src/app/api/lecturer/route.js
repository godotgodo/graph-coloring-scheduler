import lecturerController from "@/app/controllers/LecturerController";

export async function GET() {
  const res = await lecturerController.getAll();
  return res;
}

export async function POST(req) {
  const res = await lecturerController.insert(await req.json());
  return res;
}

export async function PUT(req) {
  const { id, ...data } = await req.json();
  const res = await lecturerController.update(id, data);
  return res;
}

export async function DELETE(req) {
  const { id } = await req.json();
  const res = await lecturerController.delete(id);
  return res;
}