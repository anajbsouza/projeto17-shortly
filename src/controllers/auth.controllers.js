import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { db } from "../database/database.connection.js";

export async function signup(req, res) {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    await usersRepository.createUser(name, email, hash)
    res.sendStatus(201);
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rowCount === 0) return res.status(401).send({ message: "E-mail não cadastrado!" })

        const correctPassword = bcrypt.compareSync(password, user.rows[0].password);
        if (!correctPassword) return res.status(401).send({ message: "Senha incorreta!" });

        const token = uuid();
        await db.query(
            `INSERT INTO sessions (userid, token) VALUES ($1, $2);`,
            [user.id, token]
        )
        res.send({token});
    } catch(err) {
        res.status(500).send(err.message);
    }
}