const { request } = require("express");
const moment = require("moment");

function tracer(request, response, next) {
  const logtracer =
    request.protocol +
    "//:" +
    request.host +
    request.originalUrl +
    " | date details => " +
    moment().format();
  console.log(logtracer);
  next();
}

module.exports = tracer;
