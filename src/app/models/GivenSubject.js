const mongoose = require('mongoose');
const Subject = require('./Subject.js');

const GivenSubjectSchema = new mongoose.Schema({
   /* code:{
        type: "String",
        maxlength: [8, "Subject code cannot be more than 8 characters."]
    },*/
    startTime: {
        type:"Number",
        enum:[9,10,11,12,13,14,15,16,17]
    },
    endTime: {
        type:"Number",
        enum:[9,10,11,12,13,14,15,16,17]
    },
    day:{
        type:"Number",
        enum:[1,2,3,4,5],
    },
    lecturer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Lecturer',
        required: [true, "Lecturer field is required."]
    },
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject',
        required: [true, "Subject field is required."]
    },
    class: {
        type: mongoose.Schema.ObjectId,
        ref: 'Class'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

GivenSubjectSchema.pre('save', async function(next){
        const subject = await Subject.findById(this.subject);  
        this.lecturer = subject.lecturer;
        next();
})

const GivenSubject = mongoose.models.GivenSubject || mongoose.model("GivenSubject", GivenSubjectSchema);

module.exports = GivenSubject;