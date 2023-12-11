import { urlsRepository } from "../repositories/urls.repository.js";


async function shortenUrl(url, userId, shortUrl) {
    try {
        const result = await urlsRepository.createShortUrl(url, userId, shortUrl);
        const id = result.id;
        res.status(201).send({ id, shortUrl });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getUrlById(id) {
    try {
        const url = await urlsRepository.getUrlById(id);
        if (url.rowCount === 0) return res.sendStatus(404);
        res.send(url.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function redirectToUrl(shortUrl) {
    try {
        const url = await urlsRepository.getUrlByName(shortUrl);
        if (url.rowCount === 0) return res.status(404).send("URL não existe!");

        await urlsRepository.increaseViews(shortUrl);

        res.redirect(url.rows[0].url);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function deleteUrl(urlId, userId, res) {
    try {
        const url = await urlsRepository.getUrlById(urlId);
        if (url.rowCount === 0) return res.status(404).send({ message: "URL não existe!" })
        if (url.rows[0].userId !== userId) return res.status(401).send({ message: "Você só pode deletar os itens criados por você!" })
        
        await urlsRepository.deleteUrl(urlId);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const urlsServices = {
    shortenUrl,
    getUrlById,
    redirectToUrl,
    deleteUrl
}