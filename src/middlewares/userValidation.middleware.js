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

export async function deleteUrl(req, res) {

    try {
        const urlId = req.params.id;
        const userId = res.locals.session.user_id;
        
        const urlResult = await db.query("SELECT * FROM short_urls WHERE id = $1", [urlId]);
        const urlRecord = urlResult.rows[0];

        if (!urlRecord) return res.sendStatus(404); 
        if (urlRecord.user_id !== userId) return res.sendStatus(401); 
        await db.query("DELETE FROM short_urls WHERE id = $1", [urlId]);

        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}