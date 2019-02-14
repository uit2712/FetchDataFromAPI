import HTTPMethods from '../constants/HTTPMethods';
import Hero from '../models/Hero';
import Message from '../models/Message';

let heroApiUrl = 'http://hero-api.somee.com/api/heroes';

export const getHeader = (method: string, body = {}) => {
    let httpHeader = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    switch(method) {
        default:
        case HTTPMethods.GET:
            httpHeader.method = HTTPMethods.GET;
            break;
        case HTTPMethods.POST:
            httpHeader.method = HTTPMethods.POST;
            httpHeader.body = body;
            break;
        case HTTPMethods.PUT:
            httpHeader.method = HTTPMethods.PUT;
            httpHeader.body = body;
            break;
        case HTTPMethods.DELETE:
            httpHeader.method = HTTPMethods.DELETE;
            break;
    }

    return httpHeader;
}

export const processResponse = (response: Response) => {
    if (!response)
        return ({ responseJson: 'Invalid response', responseStatus: 404 });

    return response.json().then(json => ({ responseJson: json, responseStatus: response.status }));
}

export const checkIfResponseValids = (responseStatus: number) => {
    return responseStatus == 200;
}

// result: boolean (create successfully or not)
/**
 * example body:
 * { heroName: 'Thor' }
 */
export const createHero = (hero: Hero) => {
    let msg = new Message();
    if (!hero)
        return new Promise((resolve, reject) => {
            msg.result = false;
            msg.message = 'Invalid input hero!';
            resolve({ result: msg.result, message: msg.message });
        });

    let url = heroApiUrl;
    let header = getHeader(HTTPMethods.POST,
        JSON.stringify({
            heroName: hero.heroName
        })
    );

    return fetch(url, header)
            .then(response => processResponse(response))
            .then(responseData => {
                if (!checkIfResponseValids(responseData.responseStatus)) {
                    msg.result = false;
                    msg.message = 'Create new hero failed!';
                } else {
                    msg.result = true;
                    msg.message = 'Create new hero successfully!';
                }
                return ({ result: msg.result, message: msg.message });
            })
            .catch(error => {
                msg.result = false;
                msg.message = `${error.message}`;
                return ({ result: msg.result, message: msg.message });
            })
}

export const getAllHeroes = () => {
    let msg = new Message();
    msg.result = [];
    let url = heroApiUrl;
    let header = getHeader(HTTPMethods.GET);

    return fetch(url, header)
            .then(response => processResponse(response))
            .then(responseData => {
                if (!checkIfResponseValids(responseData.responseStatus)) {
                    msg.result = [];
                    msg.message = 'Get all heroes failed';
                } else {
                    for (let i = 0; i < responseData.responseJson.length; i++) {
                        let hero = new Hero(responseData.responseJson[i]);
                        msg.result.push(hero);
                    }
                    msg.message = 'Get all heroes successfully!';
                }
                return ({ result: msg.result, message: msg.message });
            })
            .catch(error => {
                msg.result = false;
                msg.message = `${error.message}`;
                return ({ result: msg.result, message: msg.message });
            })
}

// result: boolean (update successfully or not)
/**
 * example body:
 * {
 *  heroId: '1'
 *  heroName: 'Thor',
 *  heroPowers: [ 1, 2, 3 ]
 * }
 */
export const updateHero = (hero: Hero) => {
    let msg = new Message();
    if (!hero)
        return new Promise((resolve, reject) => {
            msg.result = false;
            msg.message = 'Invalid input hero!';
            resolve({ result: msg.result, message: msg.message });
        });

    let url = `${heroApiUrl}/${hero.heroId}`;
    let header = getHeader(HTTPMethods.PUT,
        JSON.stringify({
            heroId: hero.heroId,
            heroName: hero.heroName,
            heroPowers: hero.heroPowers
        })
    );

    return fetch(url, header)
            .then(response => processResponse(response))
            .then(responseData => {
                if (!checkIfResponseValids(responseData.responseStatus)) {
                    msg.result = false;
                    msg.message = 'Update hero failed!';
                } else {
                    msg.result = true;
                    msg.message = 'Update hero successfully!';
                }
                return ({ result: msg.result, message: msg.message });
            })
            .catch(error => {
                msg.result = false;
                msg.message = `${error.message}`;
                return ({ result: msg.result, message: msg.message });
            })
}

export const deleteHero = (hero: Hero) => {
    let msg = new Message();
    if (!hero)
        return new Promise((resolve, reject) => {
            msg.result = false;
            msg.message = 'Invalid input hero!';
            resolve({ result: msg.result, message: msg.message });
        });

    let url = `${heroApiUrl}/${hero.heroId}`;
    let header = getHeader(HTTPMethods.DELETE);

    return fetch(url, header)
            .then(response => processResponse(response))
            .then(responseData => {
                if (!checkIfResponseValids(responseData.responseStatus)) {
                    msg.result = false;
                    msg.message = 'Delete hero failed!';
                } else {
                    msg.result = true;
                    msg.message = 'Delete hero successfully!';
                }
                return ({ result: msg.result, message: msg.message });
            })
            .catch(error => {
                msg.result = false;
                msg.message = `${error.message}`;
                return ({ result: msg.result, message: msg.message });
            })
}