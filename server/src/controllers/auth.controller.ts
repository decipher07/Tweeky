import { Response, Request, NextFunction } from "express";
import { getGoogleAuthURL, oauth2Client } from '../auth/utils'
import { google } from 'googleapis';
import Logging from "../logger/logging";

/* Server redirection to different website */
const getGoogleAuthURLController = (req: Request, res: Response) => {
    return res.redirect(getGoogleAuthURL());
}

/* Redirect Google Controller 
    This gets hit after the oauth is performed from OAuth
*/
const redirectGoogleAuthController = async (req: Request, res: Response) => {
    const code = req.query.code as string;

    try {
        /* Get the tokens credentials to be added for OAuth */
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.credentials = tokens;

        /* Google SDK for Google Plus Integration */
        let googleOAuthInfoRedirect = google.oauth2({ version: 'v2', auth: oauth2Client })

        /* Getting the Google User Information */
        const googleUserInfo = await googleOAuthInfoRedirect.userinfo.get();
        const email = googleUserInfo.data.email;

        /**
         * Sample Output
         * {
  config: {
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'GET',
    userAgentDirectives: [ [Object] ],
    paramsSerializer: [Function (anonymous)],
    headers: {
      'x-goog-api-client': 'gdcl/6.0.3 gl-node/19.0.1 auth/8.7.0',
      'Accept-Encoding': 'gzip',
      'User-Agent': 'google-api-nodejs-client/6.0.3 (gzip)',
      Authorization: 'Bearer ya29.a0AeTM1ifSt-VW0biqD2gUoFag1ZJJb93S79IeWyJujZHjLK1YYO3Cvg1a43HvIyQVclcteiZBo5mTlP9yjVYYEPKm7B2OZ5EY3-YX08uEtBNNv7k_xP988e2sSQWSYlYTWOuejX8zbG2BLDVu0x-bYyIkvhxHaCgYKAQQSARMSFQHWtWOmV7_kWBBby5p5p42lh8wHfg0163',
      Accept: 'application/json'
    },
    params: {},
    validateStatus: [Function (anonymous)],
    retry: true,
    responseType: 'json'
  },
  data: {
    id: '116430665974447356042',
    email: 'social.deej@gmail.com',
    verified_email: true,
    name: 'Deepankar Jain',
    given_name: 'Deepankar',
    family_name: 'Jain',
    picture: 'https://lh3.googleusercontent.com/a/ALm5wu0gKSvz16y1CJlrAvM1lXY8Rj_aBR15t1xWU8lKDg=s96-c',
    locale: 'en-GB'
  },
  headers: {
    'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
    'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
    connection: 'close',
    'content-encoding': 'gzip',
    'content-type': 'application/json; charset=UTF-8',
    date: 'Fri, 25 Nov 2022 15:58:34 GMT',
    expires: 'Mon, 01 Jan 1990 00:00:00 GMT',
    pragma: 'no-cache',
    server: 'ESF',
    'transfer-encoding': 'chunked',
    vary: 'Origin, X-Origin, Referer',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '0'
  },
  status: 200,
  statusText: 'OK',
  request: { responseURL: 'https://www.googleapis.com/oauth2/v2/userinfo' }
}
         */
        return res.status(200).json({ "success": true, "data": tokens, "message": null });
    } catch (err: any) {
        Logging.error(err.message);
        return res.status(404).json({ "success": false, "data": null, "message": "Error in redirecting" });
    }
}

export { getGoogleAuthURLController, redirectGoogleAuthController };