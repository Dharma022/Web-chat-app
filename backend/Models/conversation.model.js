const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    messages:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Message',
            default: []
        }
    ]
},{
    timestamps : true //for created at and updated at fields
})

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;