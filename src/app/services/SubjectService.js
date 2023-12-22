const { Service } = require("./service");

class SubjectService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

module.exports = SubjectService;
