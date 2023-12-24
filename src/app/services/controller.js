class Controller {
  constructor(service) {
    this.service = service;
  }
  async getAll(populate) {
    try {
      const res = await this.service.getAll(populate);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async insert(data) {
    try {
      const res = await this.service.insert(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async update(id, data) {
    try {
      const res = await this.service.update(id, data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id) {
    const res = await this.service.delete(id);
    return res;
  }

  async getById(id)
  {
    const res = await this.service.getById(id);
    return res;
  }
}

module.exports = Controller;
