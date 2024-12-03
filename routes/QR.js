var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', function (req, res) {
const text = req.query.text || 'Example'; // デフォルト値 "Example"
const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
request(apiUrl, { encoding: null }, function (error, response, body) {
if (!error && response.statusCode === 200) {
res.setHeader('Content-Type', 'image/png');
res.send(body);
} else {
res.status(500).json({
error: 'Failed to generate QR code',
details: error || `Status Code: ${response.statusCode}`,
});
}
});
});

module.exports = router;