const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    total_score: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['FINISHED', 'IN_PROGRESS', 'PENDING']
    }

});

const playerModel = mongoose.model('playerscores', playerSchema);

module.exports = playerModel;