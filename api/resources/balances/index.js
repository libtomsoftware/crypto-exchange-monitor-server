const responder = require('../../common/responder'),
    balances = require('../../../balances'),
    CONFIG = require('../../../config');

module.exports = new class BalancesResource {

    get(request, response) {
        responder.send(response, {
            status: CONFIG.CONSTANTS.HTTP_CODE.OK,
            data: balances.current
        });
    }

};