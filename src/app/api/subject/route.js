import subjectController from "@/app/controllers/SubjectController";

export async function GET() {
  const res = await subjectController.getAll({ populate: ["lecturer"] });
  return res;
}

export async function POST(req) {
  const res = await subjectController.insert(await req.json());
  return res;
}

export async function PUT(req) {
  const { id, ...data } = await req.json();
  const res = await subjectController.update(id, data);
  return res;
}

export async function DELETE(req) {
  const { id } = await req.json();
  const res = await subjectController.delete(id);
  return res;
}
