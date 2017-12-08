const responder = require('../../common/responder'),
    ticker = require('../../../ticker'),
    CONFIG = require('../../../config');

module.exports = new class TickerResource {

    get(request, response) {
        responder.send(response, {
            status: CONFIG.CONSTANTS.HTTP_CODE.OK,
            data: ticker.current
        });
    }

};