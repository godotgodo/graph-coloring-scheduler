const { Service } = require("./service");
const Subject = require("../models/Subject");
const connectDB = require("@/config/db");
const isSubjectUsed = require("@/utils/isSubjectUsed");

class GivenSubjectService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
  async insert(data) {
    try {
      await connectDB();
      const isUsed = await Subject.findById(data.subject);
      if(isUsed)
      {
        return Response.json({message: "This subject is already in use."}, { status: 400 });
      }
      else
      {
        const { lecturer } = await Subject.findById(data.subject);
        data.lecturer = lecturer;
        const givenSubjectsByTheLecturer = await this.model.find({lecturer: data.lecturer});
        if(isSubjectUsed(data, givenSubjectsByTheLecturer))
        {
          return Response.json({message: "There is already a given class at this time."}, { status: 400 });
        }
        const res = await this.model.create(data);
        return Response.json(res, { status: 200 });
      }
    } catch (e) {
      return Response.json(e, { status: 400 });
    }
  }
}

module.exports = GivenSubjectService;
