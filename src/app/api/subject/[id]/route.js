import subjectController from "@/app/controllers/SubjectController";

export async function GET(req) {
  const id = req.url.split("subject/")[1];
  const res = await subjectController.getById(id);
  return res;
}