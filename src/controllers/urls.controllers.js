import { nanoid } from 'nanoid';
import { db } from "../database/database.connection.js";

export async function shortenUrl(req, res) {
    try {
        const { url } = req.body;
        const userId = res.locals.session.userId;
        const shortUrl = nanoid(8);

        const result = await db.query(
            "INSERT INTO short_urls (original_url, short_url, user_id) VALUES ($1, $2, $3) RETURNING id",
            [url, shortUrl, userId]
        );

        const id = result.rows[0].id;
        res.status(201).send({ id, shortUrl });
    } catch (err) {
        res.status(500).send(err.message);
    }
}
