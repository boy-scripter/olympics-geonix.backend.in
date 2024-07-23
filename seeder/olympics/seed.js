const mongoose = require('mongoose');
const connect = require('../db');
const BlogModel = require("./schemas/blog.schema")
const data = require('../../data/blogs.json');

async function seed() {
    await connect;

    try {
        for (let currentData of data) {
            await new BlogModel(currentData).save();
        }

        console.log('Data seeded successfully');


    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        mongoose.connection.close();
    }
}

seed();