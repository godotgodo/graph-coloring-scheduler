const { Service } = require("./service");
const Subject = require("../models/Subject");
const Class = require("../models/Class");
const GivenSubject = require("../models/GivenSubject");
const connectDB = require("@/config/db");
const { isSubjectUsed } = require("@/utils/isSubjectUsed");
import Graf from "@/utils/Graf";

async function checkClasses() {
  let res = await GivenSubject.find();
  const classes = await Class.find();
  const graf = new Graf(res, classes);
  let notEnoughClasses = false;
  graf.renklendirilmisGrafiGetir().forEach((node) => {
    res.forEach(async (givenSubject) => {
      if (node.dugum === givenSubject.id) {
        if (node.renk == null) {
          notEnoughClasses = true;
        }
        givenSubject.class = node.renk;
        await GivenSubject.findByIdAndUpdate(givenSubject.id, {
          class: givenSubject.class,
        });
      }
    });
  });
  return notEnoughClasses;
}

class GivenSubjectService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
  async insert(data) {
    try {
      await connectDB();
      const isUsed = await this.model.find({ subject: data.subject });
      if (isUsed.length > 0) {
        return Response.json(
          { message: "This subject is already in use." },
          { status: 400 }
        );
      } else {
        const { lecturer } = await Subject.findById(data.subject);
        data.lecturer = lecturer;
        const givenSubjectsByTheLecturer = await this.model.find({
          lecturer: data.lecturer,
        });
        const targetSubject = await Subject.findById(data.subject);
        const subjectsForGrades = await Subject.find({grade: targetSubject.grade});
        const subjectIds = subjectsForGrades.map(subject => subject.id);
        const givenSubjectByGrade = await this.model.find({subject: {$in: subjectIds}});
        if (isSubjectUsed(data, givenSubjectsByTheLecturer)) {
          return Response.json(
            { message: "There is already a given class at this time by the lecturer." },
            { status: 400 }
          );
        }
        if(isSubjectUsed(data, givenSubjectByGrade)){
          return Response.json(
            { message: "There is already a given class for this grade." },
            { status: 400 }
          );
        }
        const res = await this.model.create(data);
        let isAdded = true;

        if (await checkClasses()) {
          await this.model.deleteMany({ class: null });
          isAdded = false;
        }
        const currentGivens = await this.model.find();
        return Response.json({ res, isAdded, currentGivens }, { status: 200 });
      }
    } catch (e) {
      return Response.json(e, { status: 400 });
    }
  }
}

module.exports = GivenSubjectService;
