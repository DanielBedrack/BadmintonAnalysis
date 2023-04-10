const User = require('../Models/userModel')
const bcrypt = require('bcrypt')

const handlerNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if(!user || pwd) return res.status(400).json({ 'messagge': 'Name and password are required'});

    // check for duplication in db
    const duplication = await User.findOne({ userName: user}).exec();
    if (duplication) return res.sendStatus(409); // Conflict

    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10)

        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        console.log(result)
        res.status(200).json({ 'success': `New user ${user} created`})
    } catch (error){
        res.status(400).json( {'massege': error.messagge})
    }
}

module.exports = { handlerNewUser };