import { db } from "../database/database.connection.js"; 

export async function getCurrentUser(req, res) {
    const { userId } = res.locals;

    try {
        const { rows: [user] } = await db.query(`
            SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount", 
                    JSON_AGG(
                        JSON_BUILD_OBJECT('id', urls.id, 'url', urls.url, 'shortUrl', urls."shortUrl", 'visitCount', urls."visitCount")
                    ) AS "shortenedUrls"
                FROM users 
                JOIN urls ON users.id = urls."userId"
                WHERE users.id=$1
                GROUP BY users.id, users.name;`,
            [userId]
        );
        res.send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUserRanking(req, res) {
    try {
        const { rows: ranking } = await db.query(`
            SELECT users.id, users.name, COUNT(urls.id) "linksCount", COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
                FROM users 
                LEFT JOIN urls ON users.id = urls."userId"
                GROUP BY users.id, users.name
                ORDER BY "visitCount" DESC, "linksCount" DESC
                LIMIT 10;
        `);
        res.send(ranking);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
