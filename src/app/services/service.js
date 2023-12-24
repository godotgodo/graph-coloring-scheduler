import connectDB from "@/config/db";

class Service {
  constructor(model) {
    this.model = model;
  }

  async getAll({populate}) {
    try {
      await connectDB();
      let res;
      if (populate) {
        res = await this.model.find().populate(populate);
      } else {
        res = await this.model.find();
      }
      return Response.json(res, { status: 200 });
    } catch (error) {
      return Response.json(error, { status: 400 });
    }
  }

  async insert(data) {
    try {
      await connectDB();
      const res = await this.model.create(data);
      return Response.json(res, { status: 200 });
    } catch (e) {
      return Response.json(e, { status: 400 });
    }
  }

  async update(id, data) {
    try {
      await connectDB();
      const res = await this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!res) {
        return Response.json({ message: "Not Found." }, { status: 404 });
      }
      return Response.json(res, { status: 200 });
    } catch (error) {
      return Response.json(error, { status: 400 });
    }
  }

  async delete(id) {
    try {
      await connectDB();
      const res = await this.model.findByIdAndDelete(id);
      console.log(res);
      if (!res) {
        return Response.json({ message: "Not Found" }, { status: 404 });
      }
      return Response.json(
        { message: "Deleted successfuly." },
        { status: 200 }
      );
    } catch (error) {
      return Response.json(error, { status: 400 });
    }
  }

  async getById(id) {
    try {
      await connectDB();
      const res = await this.model.findById(id);
      if (!res) {
        return Response.json(
          { message: `There is no record with the id of ${id}` },
          { status: 400 }
        );
      }
      return Response.json(res, { status: 200 });
    } catch (e) {
      return Response.json(e, { status: 400 });
    }
  }
}

module.exports = { Service };
