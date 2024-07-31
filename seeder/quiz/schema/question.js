// models/Question.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    text: { type: String, required: true },
    time_provide: { type: Number, default: 10 },
});

const QuestionModel = mongoose.model('Question', questionSchema);

module.exports = QuestionModel;
