const Messages = require("../models/messageModel");


module.exports.addMessage = async (req, res, next) => {
    try {
        const {from, to, message} = req.body;
        const data = await Messages.create({
            message: {
                text: message
            },
            users : [from, to],
            sender : from
        })
        if(data){
            return res.json({msg: "Message added successfully!"})
        }
        return res.json({msg: "Message added failed!"});

    } catch (error) {
        next(error)
    }
}

module.exports.getMessages = async (req, res, next) => {
    try {
        const {from, to} = req.body;
        const data = await Messages.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1} )

        const projectMessages = data.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        return res.json({projectMessages});
        
        // if(data){
        //     return res.json({data})
        // }
        // return res.json({msg: "Get Message failed!"});
        
    } catch (error) {
        next(error)
    }
}