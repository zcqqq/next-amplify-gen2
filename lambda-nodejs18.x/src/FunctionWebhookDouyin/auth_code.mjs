import https from 'https';
import appsync from './appsync.mjs';

export default async function auth_code(queryStringParameters) {
    // get token
    const url = 'https://open.douyin.com/oauth/access_token/';
    const options = {
        method: 'POST', queryStringParameters: {
            'client_key': process.env.client_key,
            'client_secret': process.env.client_secret,
            code: queryStringParameters.code,
            grant_type: 'authorization_code'
        }
    };
    console.log('options: ' + JSON.stringify(options));
    const access_tokenResponse = await new Promise((resolve, reject) => {
        const req = https.request(url, options, res => {
            let rawData = '';
            res.on('data', chunk => { rawData += chunk; });
            res.on('end', () => {
                try { resolve(JSON.parse(rawData)); } catch (err) { reject(new Error(err)); }
            });
        });
        req.on('error', err => { reject(new Error(err)); });
        req.end();
    });
    console.log('response: '+JSON.stringify(access_tokenResponse));

    //update token to channel
    try {
        await appsync({
            query: 'mutation MyMutation {updateChannel(input: {id: "' + access_tokenResponse.data.open_id
                + '", douyin_access_token: "' + access_tokenResponse.data.access_token
                + '", douyin_access_expires_in: "' + access_tokenResponse.data.expires_in
                + '", douyin_refresh_expires_in: "' + access_tokenResponse.data.refresh_expires_in
                + '", douyin_refresh_token: "' + access_tokenResponse.data.refresh_token
                + '", douyin_scope: "' + access_tokenResponse.data.scope
                + '"}){id}}',
        });
    } catch (error) { return { statusCode: 400, body: error.message, }; }
}