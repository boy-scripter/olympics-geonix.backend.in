const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    options: { type: [String], required: true },
    correct_option: { type: String, required: true }
});

const AnswerModel = mongoose.model('Answer', answerSchema);

module.exports = AnswerModel;