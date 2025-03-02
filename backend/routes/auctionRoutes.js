const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const auth = require('../middleware/auth');

router.post('/', auth, auctionController.createAuction);
router.get('/', auctionController.getAuctions);
router.get('/my-auctions', auth, auctionController.getMyAuctions);
router.get('/:id', auctionController.getAuctionById);
router.put('/:id', auth, auctionController.updateAuction);
router.delete('/:id', auth, auctionController.deleteAuction);

module.exports = router; 