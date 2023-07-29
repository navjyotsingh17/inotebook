const { getNextKeyDef } = require('@testing-library/user-event/dist/keyboard/getNextKeyDef');
var jwt = require('jsonwebtoken');
const JWT_SCERET = 'Navjyot$';// this is customizable

const fetchuser = (req, res, next) => {
    //get the user from the jet token  and add id to the req obj
    const token = req.header("auth_token");
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SCERET);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchuser;