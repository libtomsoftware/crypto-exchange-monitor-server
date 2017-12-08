'use strict';

const FILE_ID = 'monitor';

module.exports = new class Monitor {
    init() {
        require('../balances');
        require('../ticker');
    }
}
