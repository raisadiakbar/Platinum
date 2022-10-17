const morgan = require('morgan');

module.exports = morgan((tokens, req, res) => {
  const responseTime = tokens['response-time'](req, res) / 1000;

  const textLog = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    responseTime.toFixed(2), 's'
  ].join(' ');

  return textLog;
});