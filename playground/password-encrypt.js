//one way hashing algorithm
//const password = 'secret123'
//password -> excrypted - saved() = DB encrypted password

const bcryptjs = require('bcryptjs')
const password = 'secret123'

console.log('user password', password)

bcryptjs.genSalt()
    .then((salt) => {
        console.log('salt generate', salt)
        console.log(salt, salt.length)

        bcryptjs.hash(password,salt)
          .then((encryptedPassword) => {
              console.log('encryptedPassword',encryptedPassword)
              console.log('encryptedPassword',encryptedPassword.length)
          })
    })