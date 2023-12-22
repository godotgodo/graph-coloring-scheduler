const { Service } = require("./service");

class ClassService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

module.exports = ClassService;
