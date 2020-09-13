const jwt = require('jsonwebtoken')

// 4 responsibilites of a middleware function
// * can execute any code 
// * can modify req, res objects
// * can end req, res cycle
// * call the next middlware function
require('dotenv').config()

const authenticateUser = (req, res, next) => {
    // console.log(req.headers)
    const token = req.headers.authorization
    if(token) {
        let tokenData 
        try {
            tokenData = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = tokenData.id 
            next()
        } catch(e) {
            res.status('401').json({ error: e.message })
        }
        
    } else {
        res.status('401').json({ error: 'token not provided'})
    }
   
}

module.exports = {
    authenticateUser
}