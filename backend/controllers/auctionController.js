const Auction = require('../models/Auction');

exports.createAuction = async (req, res) => {
  try {
    const { title, description, startingBid, endDate, imageUrl } = req.body;

    const auction = new Auction({
      title,
      description,
      startingBid,
      endDate,
      imageUrl,
      creator: req.user.id
    });

    await auction.save();
    res.json(auction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find()
      .populate('creator', 'name')
      .sort({ createdAt: -1 });
    res.json(auctions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMyAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({ creator: req.user.id })
      .sort({ createdAt: -1 });
    res.json(auctions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ msg: 'Auction not found' });
    }

    // Check user
    if (auction.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await auction.remove();
    res.json({ msg: 'Auction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 