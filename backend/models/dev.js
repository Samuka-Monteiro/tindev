const {Schema, model} = require('mongoose')

const devSchema = Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    bio: { type: String, required: false },
    avatar: { type: String, required: true },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'dev'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'dev'
    }],
},
    {
        timestamps: true
    }
)

module.exports = model('dev', devSchema)