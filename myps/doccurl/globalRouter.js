var express = require('express');
var router = express.Router();
const createPdfHandler = require('./createPdfHandler');
let routes = [
    {
        path: "/api/pdf",
        handler: router
                .post("/create", createPdfHandler)
    }
];

module.exports = routes;