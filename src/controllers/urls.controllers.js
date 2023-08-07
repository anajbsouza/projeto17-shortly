import { nanoid } from 'nanoid';
import { db } from "../database/database.connection.js";

export async function shortenUrl(req, res) {
    try {
        const { url } = req.body;
        const userId = res.locals.session.userId;
        const shortUrl = nanoid(8);

        const result = await db.query(
            'INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id',
            [url, shortUrl, userId]
        );

        const id = result.rows[0].id;
        res.status(201).send({ id, shortUrl });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrlById(req, res) {
    try {
        const { id } = req.params;
        const urlRecord = await db.query("SELECT * FROM short_urls WHERE id = $1", [id]);
        if (urlRecord.rowCount === 0) return res.sendStatus(404);
        res.send(urlRecord.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function redirectToUrl(req, res) {
    try {
        const short_url = req.params.shortUrl;
        const result = await db.query("SELECT * FROM short_urls WHERE short_url = $1", [short_url]);
        const urlRecord = result.rows[0];

        if (!urlRecord) return res.status(404).send("URL encurtada não encontrada");
        const newVisitsCount = (urlRecord.visits || 0) + 1;
        await db.query("UPDATE short_urls SET visits = $1 WHERE short_url = $2", [newVisitsCount, short_url]);
        res.redirect(urlRecord.original_url);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res) {
    try {
        const urlId = req.params.id;
        const userId = res.locals.session.userId; 

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
