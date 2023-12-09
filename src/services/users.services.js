import { usersRepository } from "../repositories/users.repository.js";

async function getCurrentUser(userId) {
    try {
        const user = usersRepository.getCompleteUser(userId);
        if (!user.userId) return res.sendStatus(401);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getUserRanking() {
    try {
        const ranking = await usersService.getUserRanking()
        res.send(ranking);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const usersService = {
    getCurrentUser,
    getUserRanking
}