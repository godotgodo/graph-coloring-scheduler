const { Service } = require("./service");

class LecturerService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

module.exports = LecturerService;
