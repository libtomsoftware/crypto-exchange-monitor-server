'use strict';

const FILE_ID = 'encoders',
    crypto = require('crypto'),
    cipher = crypto.createCipher('aes192', 'a password'),
    CONFIG = require('../config');

module.exports = new class Balances {
    toBase64(data) {
        return new Buffer(data).toString('base64');
    }

    toHmac(data) {
        return crypto
            .createHmac('sha384', CONFIG.CONSTANTS.GEMINI.SECRET)
            .update(data)
            .digest('hex');
    }
}