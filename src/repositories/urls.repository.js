import { db } from "../database/database.connection.js"

function createShortUrl(url, shortUrl, userId) {
    return db.query(
        `INSERT INTO urls (url, "shortUrl", "userId") 
            VALUES ($1, $2, $3) 
            RETURNING id, "shortUrl"`,
        [url, shortUrl, userId]
    )
}

function getUrlById(id) {
    return db.query(`SELECT id, url, "shortUrl" FROM urls WHERE id=$1;`, [id])
}

function getUrlUserById(id) {
    return db.query(`SELECT "userId" FROM urls WHERE id=$1;`, [id])
}

function getUrlByName(shortUrl) {
    return db.query(`SELECT url FROM urls WHERE "shortUrl"=$1;`, [shortUrl])
}

function increaseViews(shortUrl) {
    return db.query(
        `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"=$1;`,
        [shortUrl]
    )
}

function deleteUrl(id) {
    return db.query(`DELETE FROM urls WHERE id=$1;`, [id])
}

export const urlsRepository = {
    createShortUrl, 
    getUrlById,
    getUrlUserById,
    getUrlByName,
    increaseViews,
    deleteUrl
}