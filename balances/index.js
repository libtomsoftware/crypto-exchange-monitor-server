'use strict';

const http = require('../http'),
    logger = require('../logger'),
    CONFIG = require('../config'),
    encoders = require('../encoders'),
    helpers = require('../helpers'),
    FILE_ID = 'balances';

module.exports = new class Balances {
    constructor() {
        this.update([]);
        this.fetch = this.fetch.bind(this);
        this.init();
    }

    update(balances) {
        this.state = {
            modified: helpers.currentTimestamp,
            current: balances
        };

        this.state.current.forEach((entry) => {
            logger.info(entry.currency, entry.amount);
        });
    }

    fetch() {
        logger.log(FILE_ID, 'Requesting update...');
        
        this.timeout = undefined;

        const payload = encoders.toBase64(JSON.stringify({
            nonce: helpers.currentTimestamp,
            request: '/v1/balances'
        }));

        http.post({
            url: CONFIG.URL.GEMINI.API + '/balances',
            headers: {
                'X-GEMINI-APIKEY': CONFIG.CONSTANTS.GEMINI.API_KEY,
                'X-GEMINI-PAYLOAD': payload,
                'X-GEMINI-SIGNATURE': encoders.toHmac(payload)
            }
        }).then((response) => {
            logger.log(FILE_ID, `${helpers.currentTimestamp} - Newest balances received, updating...`);
            this.update(response);

            if (!this.timeout) {
                this.timeout = setTimeout(this.fetch, CONFIG.CONSTANTS.GEMINI.BALANCES_FETCH_TIMEOUT);
            }
        }).catch((error) => {
            logger.error(FILE_ID, `Balances request failed: ${error}`);
        });
    }

    init() {
        this.fetch();
    }

    get current() {
        return this.state;
    }
}