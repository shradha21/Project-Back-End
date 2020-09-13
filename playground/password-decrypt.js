const bcryptjs = require('bcryptjs')
const encrypted = '$2a$10$6LuyITsyJYBO15zVyr0k4et.U8iRBSa7iQBnIzBp9UibS0mUxw6/q'
const userPass = 'secret123'

bcryptjs.compare(userPass,encrypted)
    .then((result) => {
        console.log(result)
    })

//behind the compare scene
const extractSalt = encrypted.slice(0,29)
console.log(extractSalt)

bcryptjs.hash(userPass,extractSalt)
 .then((newEncrypted) => {
     console.log(newEncrypted)
 })