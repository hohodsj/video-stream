const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    path: {
        type: String,
        require: true,
        unique: true
    },
    order: {
        type: Number,
        default: -1
    },
    coverImg: {
        type: String,
        default: ''
    },
    videos:[{
        type: Schema.Types.ObjectId,
        ref: 'VideoSchema'
    }],
    updateDate: {
        type: Date,
        default: Date.now()
    }
})

CollectionSchema.virtual('displayName').get(function() {
    const parts = this.path.split('/');
    const length = parts.length()
    if(length > 1) {
        // this should return something like name of series - season
        return `${parts[length-2]} - ${parts[length-1]}`
    }
    return parts[length-1]
})

const CollectionModel = mongoose.model('CollectionSchema', CollectionSchema)
module.exports = CollectionModel