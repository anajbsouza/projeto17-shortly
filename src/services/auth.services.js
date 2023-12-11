import { authRepository } from "../repositories/auth.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { errors } from "../errors/errors.js";


async function signup(email) {
    const user = await usersRepository.getUserByEmail(email)
    if (user.rowCount !== 0) throw errors.conflictError();
    if (user.password !== user.confirmPassword) throw errors.unprocessableEntity();
}

async function login(email, password) {
    const user = await usersRepository.getUserByEmail(email);
    if (user.rowCount === 0) throw errors.unauthorizedError();

    const correctPassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!correctPassword) throw errors.unauthorizedError();
    
    const token = uuid();
    await authRepository.createSession(user.id, token)
    
    return token;

}

export const authService = {
    signup, login
}