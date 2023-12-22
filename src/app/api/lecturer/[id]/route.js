import lecturerController from "@/app/controllers/LecturerController";

export async function GET(req) {
  const id = req.url.split("lecturer/")[1];
  const res = await lecturerController.getById(id);
  return res;
}