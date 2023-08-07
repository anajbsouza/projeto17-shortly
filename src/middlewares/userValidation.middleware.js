import { db } from "../database/database.connection.js";

export async function userValidation(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    try {
        const { rows } = await db.query("SELECT * FROM sessions WHERE token = $1", [token]);
        const session = rows[0];
        if (!session) return res.sendStatus(401);
        res.locals.session = session;
        next();
    } catch(err) {
        res.status(500).send(err.message);
    }
}