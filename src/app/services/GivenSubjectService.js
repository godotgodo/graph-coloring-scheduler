const { Service } = require("./service");
const Subject = require("../models/Subject");
const connectDB = require("@/config/db");

class GivenSubjectService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
  async insert(data) {
    try {
      await connectDB();
      const { lecturer } = await Subject.findById(data.subject);
      data.lecturer = lecturer;
      const res = await this.model.create(data);
      return Response.json(res, { status: 200 });
    } catch (e) {
      return Response.json(e, { status: 400 });
    }
  }
}

module.exports = GivenSubjectService;
