import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AuctionItem.css';

function AuctionItem({ auctions, onBid }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const foundAuction = auctions.find(a => a.id === parseInt(id));
    if (foundAuction) {
      setAuction(foundAuction);
    } else {
      setError('Auction not found');
    }
  }, [id, auctions]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (!bidAmount || parseFloat(bidAmount) <= auction.currentBid) {
      setError('Bid must be higher than current bid');
      return;
    }

    const newBid = {
      id: Date.now(),
      amount: parseFloat(bidAmount),
      bidder: "User" + Math.floor(Math.random() * 1000),
      time: new Date().toISOString()
    };
    
    onBid(auction.id, newBid);
    setBidAmount('');
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!auction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="auction-item-container">
      <h2>{auction.title}</h2>
      {auction.image && (
        <img src={auction.image} alt={auction.title} className="auction-image" />
      )}
      <div className="auction-details">
        <p className="description">{auction.description}</p>
        <p className="current-bid">Current Bid: ${auction.currentBid}</p>
        <p className="seller">Seller: {auction.seller}</p>
        <p className="end-date">Ends: {new Date(auction.endDate).toLocaleString()}</p>
      </div>

      <div className="bid-section">
        <form onSubmit={handleBidSubmit}>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Enter bid amount"
            min={auction.currentBid + 1}
            step="0.01"
            required
          />
          <button type="submit">Place Bid</button>
        </form>
      </div>

      <div className="bid-history">
        <h3>Bid History</h3>
        {auction.bids && auction.bids.length > 0 ? (
          <ul>
            {auction.bids.map((bid, index) => (
              <li key={index}>
                <span>{bid.bidder}</span>
                <span>${bid.amount}</span>
                <span>{new Date(bid.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bids yet</p>
        )}
      </div>

      <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
}

export default AuctionItem;
