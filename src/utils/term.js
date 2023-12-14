const color = {
    reset: "\x1b[0m",
    green: "\x1b[38;5;42m",
    red: "\x1b[38;5;196m",
    yellow: "\x1b[38;5;226m",
}

function err(message, error) {
    console.error(`${color.red}ERROR  ${message}${color.reset}${error ? `\n${error}` : ''}`);
}

function success(message) {
    console.info(`${color.green}${message}${color.reset}`);
}

module.exports = {
    err, success
};