const jwt = require('jsonwebtoken')

const { QSYGETPH } = require('../AS400API/QSYGETPH.js')
const { errorMsg } = require('../utils/errormsg.js')

const login = async (req,res) => {
    const {username , password} = req.body
    console.log(username,password)
    let isLogin = await QSYGETPH(username,password)

    if(isLogin === ''){
        const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn:'1d'})
        return res.json({username,token})
    }else{
        return res.status(500).send(errorMsg.qsygetph[isLogin])
    }
}

module.exports = {
    login
}