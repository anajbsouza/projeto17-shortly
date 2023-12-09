import { authRepository } from "../repositories/auth.repository.js";
import { usersRepository } from "../repositories/users.repository.js";

async function signup(email) {
    try {
        const user = await usersRepository.getUserByEmail(email)
        if (user.rowCount !== 0) return res.status(409).send("E-mail já cadastrado");
        if (user.password !== user.confirmPassword) return res.status(422).send("As senhas não coincidem");
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function login(email, password) {
    try {
        const user = await usersRepository.getUserByEmail(email);
        if (user.rowCount === 0) return res.status(401).send("E-mail não cadastrado!")

        const correctPassword = bcrypt.compareSync(password, user.rows[0].password);
        if (!correctPassword) return res.status(401).send("Senha incorreta!");
        
        const token = uuid();
        await authRepository.createSession(user.id, token)
        
        res.send({token});
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export const authService = {
    signup, login
}