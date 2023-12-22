const ClassService = require("../services/ClassService");
const Class = require("../models/Class");
const Controller = require("../services/controller");

class ClassController extends Controller {
  constructor(service) {
    super(service);
    this.service = service;
  }
}

module.exports = new ClassController(new ClassService(Class));
