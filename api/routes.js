const express = require('express');
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const path = require("path");

const shoes = require("./data/shoes");
const wear = require("./data/wear");
const config = require("./config");

const router = express.Router();

const authCheck = jwt({
    secret: {
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    },
    audience: [config.AUDIENCE],
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: "RS256"
});

router.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

router.get( "/api/", (req, res)=> {
    res.send("It's works");
});

router.get("/api/data/shoes", (req, res)=> {
    res.json(shoes);
});

router.get("/api/data/wear", authCheck, (req, res)=> {
    res.json(wear);
});

module.exports = router;