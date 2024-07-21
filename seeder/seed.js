const mongoose = require('mongoose');
const connect = require('./db');
const AnswerModel = require("./schemas/answer")
const QuestionModel = require("./schemas/question")
const data = require('../data/question.json');

async function seed() {
    await connect;

    try {
        // Clear existing data
        await QuestionModel.deleteMany({});
        await AnswerModel.deleteMany({});


        for (let currentData of data) {

          
            const question1 = await new QuestionModel({ text: currentData.question, }).save();

            const answer1 = await new AnswerModel({
                question: question1._id,
                options: [currentData.A, currentData.B, currentData.C, currentData.D],
                correct_option: currentData.answer
            }).save();

        }

        console.log('Data seeded successfully');


    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        mongoose.connection.close();
    }
}

seed();