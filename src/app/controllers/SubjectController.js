const Subject = require("../models/Subject");
const SubjectService = require("../services/SubjectService");
const Controller = require("../services/controller");

class SubjectController extends Controller {
  constructor(service) {
    super(service);
    this.service = service;
  }
}

module.exports = new SubjectController(new SubjectService(Subject));
