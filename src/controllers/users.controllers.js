import { usersService } from "../services/users.services.js";

export async function getCurrentUser(req, res) {
    const { userId } = res.locals;
    const user = usersService.getCurrentUser(userId);
    res.status(200).send(user);
}

export async function getUserRanking(req, res) {
    const ranking = await usersService.getUserRanking()
    res.status(200).send(ranking);
}
