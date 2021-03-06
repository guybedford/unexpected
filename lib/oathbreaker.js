var workQueue = require('./workQueue');
var Promise = require('bluebird');
module.exports = function oathbreaker(value) {
    if (!value || typeof value.then !== 'function') {
        return value;
    }

    if (!value.isRejected) {
        // this is not a bluebird promise
        return value;
    }

    if (value.isFulfilled()) {
        return value;
    }


    if (value.isRejected()) {
        value.caught(function () {
            // Ignore - already handled
        });

        throw value.reason();
    }

    var onResolve = function () {};
    var onReject = function () {};

    var evaluated = false;
    var error;
    var resolvedValue;
    value.then(function (obj) {
        evaluated = true;
        resolvedValue = obj;
        onResolve(value);
    }, function (err) {
        evaluated = true;
        error = err;
        onReject(err);
    });

    workQueue.drain();

    if (evaluated && error) {
        if (error._isUnexpected && Error.captureStackTrace) {
            Error.captureStackTrace(error);
        }
        throw error;
    } else if (evaluated) {
        return value;
    }

    return new Promise(function (resolve, reject) {
        onResolve = resolve;
        onReject = reject;
    });
};
