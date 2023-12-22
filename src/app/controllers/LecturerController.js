const LecturerService = require("../services/LecturerService");
const Lecturer = require("../models/Lecturer");
const Controller = require("../services/controller");

class LecturerController extends Controller {
  constructor(service) {
    super(service);
    this.service = service;
  }
}

module.exports = new LecturerController(new LecturerService(Lecturer));
