import { nanoid } from 'nanoid';
import { urlsServices } from '../services/urls.services.js';

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const userId = res.locals.session.userId;
    const shortUrl = nanoid(8);
    
    res.status(201).send(url, userId, shortUrl);
    
}

export async function getUrlById(req, res) {
    const { id } = req.params;
    const url = await urlsServices.getUrlById(id);
    res.status(200).send(url);
}

export async function redirectToUrl(req, res) {
    const { shortUrl } = req.params;
    await urlsServices.redirectToUrl(shortUrl);
}

export async function deleteUrl(req, res) {
    const { urlId } = req.params;
    const { userId } = res.locals;
    await urlsServices.deleteUrl(urlId, userId, res);
}
