import { errors } from "../errors/errors.js";
import { usersRepository } from "../repositories/users.repository.js";

async function getCurrentUser(userId) {
    const user = usersRepository.getCompleteUser(userId);
    if (!user.userId) throw errors.unauthorizedError();
}

async function getUserRanking() {
    const ranking = await usersService.getUserRanking()
    return ranking;
}

export const usersService = {
    getCurrentUser,
    getUserRanking
}