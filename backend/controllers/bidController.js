const Bid = require('../models/Bid');
const Auction = require('../models/Auction');

exports.placeBid = async (req, res) => {
  try {
    const { auctionId, amount } = req.body;

    // Check if auction exists and is active
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ msg: 'Auction not found' });
    }

    if (auction.status !== 'active') {
      return res.status(400).json({ msg: 'Auction is not active' });
    }

    if (new Date(auction.endDate) < new Date()) {
      auction.status = 'ended';
      await auction.save();
      return res.status(400).json({ msg: 'Auction has ended' });
    }

    // Check if bid amount is higher than current bid
    if (amount <= (auction.currentBid || auction.startingBid)) {
      return res.status(400).json({ 
        msg: 'Bid must be higher than current bid' 
      });
    }

    // Create new bid
    const bid = new Bid({
      auction: auctionId,
      bidder: req.user.id,
      amount
    });

    await bid.save();

    // Update auction's current bid
    auction.currentBid = amount;
    await auction.save();

    res.json(bid);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBidsByAuction = async (req, res) => {
  try {
    const bids = await Bid.find({ auction: req.params.auctionId })
      .populate('bidder', 'name')
      .sort({ amount: -1 });
    res.json(bids);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ bidder: req.user.id })
      .populate('auction')
      .sort({ createdAt: -1 });
    res.json(bids);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 