import axios from 'axios';
import CryptoJS from 'crypto-js'

// For example, a user with a public key of "1234" and a private key of "abcd" 
// could construct a valid call as follows: 
// http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150 (the hash value is the md5 digest of 1abcd1234)

const apiKey = 'e06f3fb519d402eb024b1c88e12755df';
const ts = Math.round(new Date().getTime()/1000).toString();
const generatedHash = CryptoJS.MD5(ts+'dd4ff040333b2c8d10a275640896e023b47f2eb8'+apiKey);
const params = { apikey: apiKey, ts, hash: generatedHash.toString() };

const api = axios.create();
  

export async function getAllChars(customParams) {
    return await api.get(
        `https://gateway.marvel.com/v1/public/characters`, 
        { params: {...params, ...customParams} }
    );
}

export async function getOneChar(id) {
    return await api.get(
        `https://gateway.marvel.com/v1/public/characters/${id}`, 
        { params }
    );
}

export async function getComicsByChar(id, customParams) {
    return await api.get(
        `https://gateway.marvel.com/v1/public/characters/${id}/comics`, 
        { params: {...params, ...customParams} }
    );
}

export async function getAllComics(customParams) {
    return await api.get(
        `https://gateway.marvel.com/v1/public/comics`, 
        { params: {...params, ...customParams} }
    );
}

export async function getOneComic(id) {
    return await api.get(
        `https://gateway.marvel.com/v1/public/comics/${id}`, 
        { params }
    );
}

export async function getCharsByComic(id, customParams) {
    return await api.get(
        `https://gateway.marvel.com/v1/public/comics/${id}/characters`, 
        { params: {...params, ...customParams} }
    );
}

