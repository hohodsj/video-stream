const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    path: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        default: -1
    },
    collectionSchema: {
        type: Schema.Types.ObjectId,
        ref: 'CollectionSchema'
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }
})

VideoSchema.virtual('videoName').get(function() {
    const parts = path.split('/');
    const length = parts.length
    return parts[length-1]
})

module.exports = mongoose.model('VideoSchema', VideoSchema);