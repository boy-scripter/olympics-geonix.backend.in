const mongoose = require('mongoose');
const connect = require('../db');
const playerModel = require("./schema/playscore")
const UserModel = require("./schema/user")

async function seed() {
    await connect;

    try {
        const user = await UserModel.findOne().exec()
        const data = await playerModel.find({ total_score: 3 }).populate('user').exec()

        console.log(data);

        console.log('Data dumped successfully');


    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        mongoose.connection.close();
    }
}
seed()