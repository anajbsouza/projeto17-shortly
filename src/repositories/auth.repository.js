import { db } from "../database/database.connection.js"

function createSession(userId, token) {
    return db.query(
        `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`,
        [userId, token]
    )
}

function findSession(token) {
    return db.query(`SELECT "userId" FROM sessions WHERE token=$1;`, [token])
}

export const authRepository = {
    createSession,
    findSession
}