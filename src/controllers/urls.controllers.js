import { urlsServices } from '../services/urls.services.js';

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;
    const result = await urlsServices.shortenUrl(url, userId);
    res.status(201).send(result.data);
}

export async function getUrlById(req, res) {
    const { id } = req.params;
    const url = await urlsServices.getUrlById(id);
    res.status(200).send(url);
}

export async function redirectToUrl(req, res) {
    const { shortUrl } = req.params;
    const url = await urlsServices.redirectToUrl(shortUrl);
    return res.redirect(url);
}

export async function deleteUrl(req, res) {
    const { urlId } = req.params;
    const { userId } = res.locals;
    await urlsServices.deleteUrl(urlId, userId);
    return res.sendStatus(204);
}
