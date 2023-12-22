import classController from "@/app/controllers/ClassController";

export async function GET(req) {
  const id = req.url.split("class/")[1];
  const res = await classController.getById(id);
  return res;
}