const Message = require('../models/message')
const messagesController = { }

//list all the messages
messagesController.listAll = (req, res) => {
    Message.find()
     .then((messages) => {
         res.json(messages)
     })
     .catch((err) => {
         res.json(err)
     })
}

//create the messages
messagesController.create = (req, res) => {
    const body = req.body
    const message = new Message(body)
    //assigning the user id to the message
    message.userId = req.userId
    message.save()
        .then((message) => {
            res.json(message)
        })
       .catch((err) => {
           res.json(err)
       })
}

//To see only the specific user messages
messagesController.myMessages = (req, res) => {
    Message.find({ userId: req.userId })
     .then((messages) => {
         res.json(messages)
     })
     .catch((err) => {
         res.json(err)
     })
}

//If I want to read somebody else messages then i'll do (findById), when it say i'll not allow to read someone else info then we'll do (findOne({}))
messagesController.show = (req, res) => {
    const id = req.params.id
    Message.findById(id)
      .then((message) => {
          res.json(message)
      })
      .catch((err) => {
          res.json(err)
      })
}

//I want that messages which belongs to that particular user
messagesController.userMessages = (req, res) => {
    const userId = req.params.id
    Message.find({ userId })
      .then((messages) => {
          res.json(messages)
      })
      .catch((err) => {
          res.json(err)
      })
}


//To update the message of specific user
messagesController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Message.findOneAndUpdate({ _id: id, userId: req.userId}, body, {new: true, runValidator: true })
     .then((message) => { //it will not going to throw an error,it'll return as null
      if(message) {
        res.json(message)
      }else {
          res.json({})
      }
     })
     .catch((err) => {
         res.json(err)
     })
}


//To delete the message
messagesController.destroy = (req, res) => {
    const id = req.params.id
    Message.findOneAndDelete({ _id: id, userId: req.userId })
     .then((message) => {
        if(message) {
            res.json(message)
        }else {
            res.json({})
        }
     })
}

module.exports = messagesController