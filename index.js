const fs = require("fs");

// Utility function to format the log string
function formatLog(format, req) {
    return format
        .replace(':method', req.method)
        .replace(':url', req.originalUrl)
        .replace(':ip', req.ip)
        .replace(':timestamp', new Date().toISOString());
}

// Console logger middleware
function requestLogger(options = {}) {
    const {
        enabled = true,
        format = '[:timestamp] :method :url from :ip'
    } = options;

    return function (req, res, next) {
        if (!enabled) return next();

        const log = formatLog(format, req);
        console.log(log);
        next();
    };
}

// File logger middleware
function logLogger(options = {}) {
    const {
        enabled = true,
        format = '[:timestamp] :method :url from :ip',
        filePath = './log.txt'
    } = options;

    return function (req, res, next) {
        if (!enabled) return next();

        const log = formatLog(format, req);

        fs.appendFile(filePath, log + "\n", (err) => {
            if (err) {
                console.error("Failed to write to log file:", err);
            } else {
                console.log("Log file updated");
            }
            next();
        });
    };
}

// Export both loggers
module.exports = {
    requestLogger,
    logLogger
};