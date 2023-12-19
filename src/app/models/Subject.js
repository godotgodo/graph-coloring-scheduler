const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name:{
        type: "String",
        required: [true, "Please add a name."],
        trim: true,
        maxlength: [50, "Name cannot be more than 50 characters."]
    },
    code:{
        type: "String",
        maxlength: [8, "Subject code cannot be more than 8 characters."]
    },
    grade:{
        type: "String",
        enum: [
            '1',
            '2',
            '3',
            '4'
        ]
    },
    lecturer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Lecturer',
        required: [true, "Lecturer field is required."]
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

SubjectSchema.virtual('givenSubjects',{
    ref: "GivenSubject",
    localField: "_id",
    foreignField: "subject",
    justOne: false
})

const Subject = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);

module.exports = Subject;