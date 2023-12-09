import { authService } from "../services/auth.services.js";

export async function signup(req, res) {
    const { email } = req.body;
    await authService.signup(email)
    res.sendStatus(201);
}

export async function login(req, res) {
    const { email, password } = req.body;
    await authService.login(email, password);
    res.sendStatus(200);
}