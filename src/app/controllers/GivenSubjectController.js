const GivenSubject = require("../models/GivenSubject");
const GivenSubjectService = require("../services/GivenSubjectService");
const Controller= require("../services/controller");

class GivenSubjectController extends Controller {
  constructor(service) {
    super(service);
    this.service = service;
  }
}

module.exports = new GivenSubjectController(new GivenSubjectService(GivenSubject));
