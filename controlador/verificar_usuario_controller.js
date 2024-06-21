const jwt = require('jsonwebtoken');

class VerficarUser {
    verificarUsuario(req, res, next) {
        const tokenSession = req.session.tokenSession;

        if (!tokenSession) {
            return res.redirect('/');
        }
        try {
            const keysession = req.session.username;
            const decoded = jwt.verify(tokenSession, keysession);
            console.log('Token válido:', decoded);
            req.user = decoded;
            res.locals.username = req.session.username;
            res.locals.tokenSession = true;
            next();
        } catch (error) {
            req.session.destroy();
            return res.redirect('/');
        }
    }
}
module.exports = VerficarUser;