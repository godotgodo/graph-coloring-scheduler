import GivenSubject from '@/app/models/GivenSubject';
import  Graf from '@/utils/Graf';
const givenSubjectController = require("@/app/controllers/GivenSubjectController");

export async function GET() {
  const res = await givenSubjectController.getAll();
  const graf=new Graf(res);
  graf.renklendirilmisGrafiGetir().forEach(dugum => {
    res.forEach(code => {
      if(dugum===code){
        res.class=dugum.renk;
      }
    });
  });
  return res;
}

export async function POST(req) {
  const res = await givenSubjectController.insert(await req.json());
  return res;
}

export async function PUT(req) {
  const { id, ...data } = await req.json();
  const res = await givenSubjectController.update(id, data);
  return res;
}

export async function DELETE(req) {
  const { id } = await req.json();
  const res = await givenSubjectController.delete(id);
  return res;
}