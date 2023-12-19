const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    code:{
        type: "String",
        maxlength: [8, "Subject code cannot be more than 8 characters."]
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

ClassSchema.virtual('givenSubjects',{
    ref: "GivenSubject",
    localField: "_id",
    foreignField: "class",
    justOne: false
})

const Class = mongoose.models.Class || mongoose.model("Class", ClassSchema);

module.exports = Class;