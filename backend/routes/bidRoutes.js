const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const auth = require('../middleware/auth');

router.post('/', auth, bidController.placeBid);
router.get('/auction/:auctionId', bidController.getBidsByAuction);
router.get('/my-bids', auth, bidController.getMyBids);

module.exports = router; 