import { urlsRepository } from "../repositories/urls.repository.js";
import { nanoid } from 'nanoid';
import { errors } from "../errors/errors.js";

async function shortenUrl(url, userId) {
    const shortUrl = nanoid(8);
    const result = await urlsRepository.insertUrl(url, shortUrl, userId);
    const { id } = result.rows[0];
    return { status: 201, data: { id, shortUrl } };
}

async function getUrlById(id) {
    const url = await urlsRepository.getUrlById(id);
    if (url.rowCount === 0) throw errors.notFoundError();
    return url;
}

async function redirectToUrl(shortUrl) {
    const url = await urlsRepository.getUrlByName(shortUrl);
    if (url.rowCount === 0) throw errors.notFoundError();
    await urlsRepository.increaseViews(shortUrl);
    return url;
}

async function deleteUrl(urlId, userId) {
    const url = await urlsRepository.getUrlById(urlId);
    if (url.rowCount === 0) throw errors.notFoundError();
    if (url.rows[0].userId !== userId) throw errors.unauthorizedError();
    
    await urlsRepository.deleteUrl(urlId);
}

export const urlsServices = {
    shortenUrl,
    getUrlById,
    redirectToUrl,
    deleteUrl
}