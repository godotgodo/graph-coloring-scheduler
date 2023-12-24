import givenSubjectController from "@/app/controllers/GivenSubjectController";

export async function GET(req) {
  const id = req.url.split("givenSubject/")[1];
  const res = await givenSubjectController.getById(id);
  return res;
}