const express = require("express");
const urlShortenerController = require('../controllers/urlController');
const { validateShortUrlRequest } = require("../validations/urlValidation");
const { rateLimitMiddleware } = require("../middlewares/rateLimitMiddleware");
const userAgent = require("../middlewares/userAgent");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, rateLimitMiddleware, validateShortUrlRequest, urlShortenerController.shortenUrl);
router.get("/:alias", userAgent, urlShortenerController.resolveUrl);
router.get('/analytic/:alias', authMiddleware, urlShortenerController.getUrlAnalytics);
router.get('/analytics/topic/:topic', authMiddleware, urlShortenerController.getTopicAnalytics);
router.get('/analytics/overall', authMiddleware, urlShortenerController.getOverallAnalytics);

module.exports = router;
