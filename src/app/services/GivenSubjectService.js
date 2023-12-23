const { Service } = require("./service");
const Subject = require("../models/Subject");
const connectDB = require("@/config/db");
const {isSubjectUsed} = require("@/utils/isSubjectUsed");

class GivenSubjectService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
  async insert(data) {
    try {
      await connectDB();
      const isUsed = await this.model.find({subject: data.subject});
      console.log(isUsed);
      if(isUsed.length>0)
      {
        return Response.json({message: "This subject is already in use."}, { status: 400 });
      }
      else
      {
        const { lecturer } = await Subject.findById(data.subject);
        console.log("1");
        data.lecturer = lecturer;
        const givenSubjectsByTheLecturer = await this.model.find({lecturer: data.lecturer});
        console.log(givenSubjectsByTheLecturer);
        console.log("2");
        if(isSubjectUsed(data, givenSubjectsByTheLecturer))
        {
          console.log("5");
          return Response.json({message: "There is already a given class at this time."}, { status: 400 });
        }
        console.log("3");
        const res = await this.model.create(data);
        console.log("4");
        return Response.json(res, { status: 200 });
      }
    } catch (e) {
      return Response.json(e, { status: 400 });
    }
  }
}

module.exports = GivenSubjectService;
