const mongoose = require('mongoose');
const GivenSubject = require('./GivenSubject');

const LecturerSchema = new mongoose.Schema({
    name:{
        type: "String",
        required: [true, "Please add a name."],
        trim: true,
        maxlength: [50, "Name cannot be more than 50 characters."]
    },
    surname:{
        type: "String",
        required: [true, "Please add a surname."],
        trim: true,
        maxlength: [50, "Surname cannot be more than 50 characters."]
    },    
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

LecturerSchema.virtual('givenSubjects',{
    ref: "GivenSubject",
    localField: "_id",
    foreignField: "lecturer",
    justOne: false
})

LecturerSchema.virtual('subjects',{
    ref: "Subject",
    localField: "_id",
    foreignField: "lecturer",
    justOne: false
})

const Lecturer = mongoose.models.Lecturer || mongoose.model("Lecturer", LecturerSchema);

module.exports = Lecturer;