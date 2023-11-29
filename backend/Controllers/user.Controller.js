const Message = require('./../Models/message.model');
const Conversation = require('./../Models/conversation.model');
const { getReceiverSocketId, io } = require('../socket/socket');


const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        //this method of saving takes more time
        // await conversation.save();
        // await newMessage.save();

        //whereas this method takes less time as it runs all saves in parallel.
        await Promise.all([conversation.save(), newMessage.save()]);
         //Socket io functionallity (this makes it real time.)
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // io.to(<socket_id>).emit() is used to send events to only specific clients
            io.to(receiverSocketId).emit("newMessage", newMessage)
        } 



        res.status(201).json(newMessage);

    } catch (error) {
        console.log("error in sendMessage server", error.message);
        res.status(500).json({ message: "Internal server error!!" });
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate('messages'); //it gives us actual messages rather than to have id's of the messages.

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("error in getMessages server", error.message);
        res.status(500).json({ message: "Internal server error!!" });
    }
}





module.exports = {
    sendMessage,
    getMessages
}