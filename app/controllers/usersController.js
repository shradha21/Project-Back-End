const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersController = { }

usersController.register = (req,res) => {
    const body = req.body //username,email,password
    const user = new User(body)
    /* 
    const user = new User()
    user.username = body.username
    user.email = body.email
    user.password = body.password
    */
      user.save()
       .then((user) => {
           res.json(user)
       })
       .catch((err) => {
           res.json(err)
       })
}

usersController.login = (req, res) => {
    const body = req.body //username,email,password
    //check if email is present
    User.findOne({ email: body.email })
        .then((user) => {
            if(user) {
                bcryptjs.compare(body.password,user.password)
                  .then((result) => {
                      if(result) { //generate token
                          const tokenData= {
                              id: user._id
                          }
                          const token = jwt.sign(tokenData,'dct@123', {expiresIn: '2d'})
                           res.json({
                               token: token
                           })
                      }else {
                          res.json({ errors: 'invalid email/password' })
                      }
                  })
            }else { 
                res.json({ errors: 'invalid email/password' })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}


usersController.account = (req, res) => {
    User.findById(req.userId)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = usersController