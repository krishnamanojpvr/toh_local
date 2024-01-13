const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.tollLogin;
        console.log(token);
        const verifyUser = jwt.verify(token,'TiresOnHighway');
        console.log(verifyUser);
        req.verifyUser = verifyUser;
        next();
    }
    catch (err) {
        res.clearCookie('Authenticated');
        res.status(401).send(err);
    }
}
module.exports = auth;