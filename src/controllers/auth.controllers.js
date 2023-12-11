import { authService } from "../services/auth.services.js";
import { errors } from "../errors/errors.js";

export async function signup(req, res) {
    try {
        const { email, password, confirmPassword, name } = req.body;

        // Verificando se os campos obrigatórios estão preenchidos
        if (!email || !password || !confirmPassword || !name) {
            throw errors.unprocessableEntity();
        }

        await authService.signup(email, password, confirmPassword, name);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Verificando se os campos obrigatórios estão preenchidos
        if (!email || !password) {
            throw errors.unprocessableEntity();
        }

        const token = await authService.login(email, password);
        res.send({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
}
