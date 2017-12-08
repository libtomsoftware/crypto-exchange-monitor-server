'use strict';

const http = require('../http'),
    logger = require('../logger'),
    CONFIG = require('../config'),
    encoders = require('../encoders'),
    helpers = require('../helpers'),
    FILE_ID = 'ticker';

module.exports = new class Ticker {
    constructor() {
        this.state = {};
        this.fetch = this.fetch.bind(this);

        this.init('btcusd');
        this.init('ethusd');
    }

    update(pair, ticker) {
        if (!this.state[pair]) {
            this.state[pair] = [];
        }

        const values = this.state[pair];
        const length = values.length;
        const current = {
            datetime: helpers.currentTimestamp,
            price: ticker.last
        };

        if (!length) {
            values.push(current);
            return;
        }

        const lastItem = values[length - 1];

        if (lastItem.price !== current.price) {
            values.push(current);
        }

        logger.info(pair, lastItem.price);

        if (length > CONFIG.CONSTANTS.TICKER.NUMBER_OF_ENTRIES) {
            values.shift();
        }
    }

    fetch(pair) {
        logger.log(FILE_ID, 'Requesting ticker...');

        const payload = encoders.toBase64(JSON.stringify({
            nonce: helpers.currentTimestamp,
            request: '/v1/pubticker/' + pair
        }));

        http.get({
            url: CONFIG.URL.GEMINI.API + '/pubticker/' + pair
        }).then((response) => {
            logger.log(FILE_ID, `${helpers.currentTimestamp} - Newest ticker received, updating...`);
            this.update(pair, response);
        }).catch((error) => {
            logger.error(FILE_ID, `Balances request failed: ${error}`);
        });
    }

    init(pair) {
        this.fetch(pair);
        setInterval(() => {
            this.fetch(pair);
        }, CONFIG.CONSTANTS.GEMINI.CURRENCIES_FETCH_TIMEOUT);
    }

    get current() {
        return this.state;
    }
}