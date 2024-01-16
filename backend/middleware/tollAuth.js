const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.tollLogin;
        console.log(token);
        const verify = jwt.verify(token,'TiresOnHighway');
        console.log(verify,"Authorised");
        // req.verifyUser = verifyUser;
        next();
    }
    catch (err) {
        console.log(err,"Unauthorised");
        res.clearCookie('Authenticated');
        res.status(401).send(err);
    }
}
module.exports = auth;