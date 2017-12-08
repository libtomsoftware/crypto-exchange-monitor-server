const ENV = process.env, //eslint-disable-line one-var
    ROOT_PATH = process.cwd(),
    PACKAGE_CONFIG = require(ROOT_PATH + '/package.json'),
    APP_HTTP_PORT = ENV.APP_HTTP_PORT || 4000,
    APP_URL = ENV.APP_IP || 'localhost',
    APP = {
        ADDRESS: {
            HTTP_PORT: APP_HTTP_PORT,
            URL: APP_URL
        },
        NAME: PACKAGE_CONFIG.name,
        TYPE: ENV.APP_TYPE || 'service'
    };

module.exports = {
    APP: Object.assign({}, APP, {
        ID: ENV.APP_ID || `${PACKAGE_CONFIG.name}@${APP.ADDRESS.URL}:${APP.ADDRESS.HTTP_PORT}`
    }),
    CONSTANTS: {
        HTTP_CODE: {
            OK: 200,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            CONFLICT: 409,
            INTERNAL_SERVER_ERROR: 500,
            BAD_GATEWAY: 502
        },
        GEMINI: {
            API_KEY: ENV.GEMINI_API_KEY,
            SECRET: ENV.GEMINI_SECRET,
            BALANCES_FETCH_TIMEOUT: ENV.GEMINI_BALANCES_FETCH_TIMEOUT,
            CURRENCIES_FETCH_TIMEOUT: ENV.GEMINI_CURRENCIES_FETCH_TIMEOUT
        },
        TICKER: {
            NUMBER_OF_ENTRIES: ENV.NUMBER_OF_TICKER_ENTRIES
        }
    },
    URL: {
        GEMINI: {
            API: 'https://api.gemini.com/v1'
        }
    }
};

