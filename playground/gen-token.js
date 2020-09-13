const jwt = require('jsonwebtoken')

const tokenData = {
    id: 1
}

const token = jwt.sign(tokenData, 'dct@123', { expiresIn: '2d'})
console.log(token)