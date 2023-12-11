import { db } from "../database/database.connection.js"

function createShortUrl(url, shortUrl, userId) {
    return db.query(
        `INSERT INTO short_urls (original_url, short_url, user_id) 
            VALUES ($1, $2, $3) 
            RETURNING id, short_url`,
        [url, shortUrl, userId]
    )
}

function getUrlById(id) {
    return db.query(`SELECT * FROM short_urls WHERE short_url = $1`, [id])
}

function getUrlUserById(id) {
    return db.query(`SELECT user_id FROM short_urls WHERE id=$1;`, [id])
}

function getUrlByName(shortUrl) {
    return db.query(`SELECT original_url FROM short_urls WHERE short_url=$1;`, [shortUrl])
}

function increaseViews(shortUrl) {
    return db.query(
        `UPDATE short_urls SET visits = visits + 1 WHERE short_url=$1;`,
        [shortUrl]
    )
}

function deleteUrl(id) {
    return db.query(`DELETE FROM short_urls WHERE id=$1;`, [id])
}

export const urlsRepository = {
    createShortUrl, 
    getUrlById,
    getUrlUserById,
    getUrlByName,
    increaseViews,
    deleteUrl
}