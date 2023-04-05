const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = (req,res) => {
    const {username, Password} = req.body;
    User.findOne({username: username}, (error,user) => {
        if (user) {
            bcrypt.compare(Password, user.Password, (error,same)=> {
                if(same){
                    req.session.userId = user._id         
                    res.redirect('/')
                }
                else {
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })
}