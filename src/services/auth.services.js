import { authRepository } from "../repositories/auth.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { errors } from "../errors/errors.js";

async function signup(email, password, confirmPassword, name) {
    // Verificando se a senha e a confirmação de senha são iguais
    if (password !== confirmPassword) {
        throw errors.unprocessableEntity();
    }

    const user = await usersRepository.getUserByEmail(email);
    if (user.rowCount !== 0) {
        throw errors.conflictError();
    }

    // Hash da senha antes de salvar no banco de dados
    const hashedPassword = bcrypt.hashSync(password, 10);
    await usersRepository.createUser(name, email, hashedPassword);
}

async function login(email, password) {
    const user = await usersRepository.getUserByEmail(email);
    if (user.rowCount === 0) {
        throw errors.unauthorizedError();
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.rows[0].password);
    if (!isPasswordCorrect) {
        throw errors.unauthorizedError();
    }

    const token = uuid();
    await authRepository.createSession(user.rows[0].id, token);
    return token;
}

export const authService = {
    signup,
    login,
};
