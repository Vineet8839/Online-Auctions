import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LiveAuctions.css';
import { Container, Typography, Box } from '@mui/material';

const LiveAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, ending-soon, price-low-high, price-high-low
  const [searchTerm, setSearchTerm] = useState('');
  const [bidAmount, setBidAmount] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    loadAuctions();
  }, [loadAuctions]);

  const loadAuctions = () => {
    const allAuctions = JSON.parse(localStorage.getItem('auctions')) || [];
    const bids = JSON.parse(localStorage.getItem('bids')) || [];
    const now = new Date();
    
    const liveAuctions = allAuctions
      .filter(auction => new Date(auction.endDate) > now)
      .map(auction => ({
        ...auction,
        bids: bids.filter(bid => bid.auctionId === auction.id),
        highestBid: getHighestBid(auction.id, bids)
      }));
    
    setAuctions(liveAuctions);
    setLoading(false);
  };

  const getHighestBid = (auctionId, bids) => {
    const auctionBids = bids.filter(bid => bid.auctionId === auctionId);
    if (auctionBids.length === 0) return null;
    return Math.max(...auctionBids.map(bid => bid.amount));
  };

  const hasUserBid = (auctionId) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return false;

    const bids = JSON.parse(localStorage.getItem('bids')) || [];
    return bids.some(bid => 
      bid.auctionId === auctionId && bid.userId === currentUser.id
    );
  };

  const handleBid = async (auctionId) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Check if user is authenticated
    if (!currentUser) {
      navigate('/signin');
      return;
    }

    // Check if user has already bid on this auction
    if (hasUserBid(auctionId)) {
      setError('You have already placed a bid on this auction');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const amount = parseFloat(bidAmount[auctionId]);
    const auction = auctions.find(a => a.id === auctionId);
    const currentHighestBid = auction.highestBid || auction.startingBid;

    if (!amount || amount <= currentHighestBid) {
      setError(`Bid must be higher than current bid: $${currentHighestBid}`);
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      // Create new bid
      const newBid = {
        id: Date.now(),
        auctionId,
        amount,
        userId: currentUser.id,
        userEmail: currentUser.email,
        timestamp: new Date().toISOString()
      };

      // Save bid in bids history
      const bids = JSON.parse(localStorage.getItem('bids')) || [];
      localStorage.setItem('bids', JSON.stringify([...bids, newBid]));

      // Update auction with new highest bid
      const updatedAuctions = auctions.map(a => {
        if (a.id === auctionId) {
          return {
            ...a,
            currentBid: amount,
            lastBidder: currentUser.id,
            bids: [...(a.bids || []), newBid],
            highestBid: amount
          };
        }
        return a;
      });

      // Save updated auctions
      localStorage.setItem('auctions', JSON.stringify(updatedAuctions));
      setAuctions(updatedAuctions);
      setBidAmount({ ...bidAmount, [auctionId]: '' });
      
      // Create notification for auction owner
      const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      const newNotification = {
        id: Date.now(),
        auctionId,
        type: 'new_bid',
        message: `New bid of $${amount} placed on your auction "${auction.title}"`,
        userId: auction.userId,
        timestamp: new Date().toISOString(),
        read: false
      };
      localStorage.setItem('notifications', JSON.stringify([...notifications, newNotification]));

      setSuccess('Bid placed successfully!');
      setTimeout(() => setSuccess(''), 3000);

      // Trigger auction update event
      window.dispatchEvent(new Event('auctionsUpdated'));
    } catch (err) {
      setError('Error placing bid. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const getFilteredAuctions = () => {
    let filtered = [...auctions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(auction =>
        auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (filter) {
      case 'ending-soon':
        filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
        break;
      case 'price-low-high':
        filtered.sort((a, b) => (a.highestBid || a.startingBid) - (b.highestBid || b.startingBid));
        break;
      case 'price-high-low':
        filtered.sort((a, b) => (b.highestBid || b.startingBid) - (a.highestBid || a.startingBid));
        break;
      default:
        break;
    }

    return filtered;
  };

  const getTimeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const renderBidButton = (auction) => {
    const userHasBid = hasUserBid(auction.id);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isOwner = currentUser && auction.userId === currentUser.id;

    if (isOwner) {
      return <button className="bid-button disabled" disabled>Your Auction</button>;
    }

    if (userHasBid) {
      return <button className="bid-button disabled" disabled>Already Bid</button>;
    }

    return (
      <div className="bid-form">
        <input
          type="number"
          placeholder="Enter bid amount"
          value={bidAmount[auction.id] || ''}
          onChange={(e) => setBidAmount({
            ...bidAmount,
            [auction.id]: e.target.value
          })}
          min={auction.highestBid || auction.startingBid}
          step="0.01"
        />
        <button 
          onClick={() => handleBid(auction.id)}
          className="bid-button"
        >
          Place Bid
        </button>
      </div>
    );
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Live Auctions
        </Typography>
      </Box>

      <div className="live-auctions">
        <div className="live-auctions-header">
          <h1>Live Auctions</h1>
          <div className="filters">
            <input
              type="text"
              placeholder="Search auctions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Auctions</option>
              <option value="ending-soon">Ending Soon</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {loading ? (
          <div className="loading">Loading auctions...</div>
        ) : (
          <div className="auctions-grid">
            {getFilteredAuctions().map(auction => (
              <div key={auction.id} className="auction-card">
                <div className="auction-image">
                  <img src={auction.imageUrl || '/placeholder.jpg'} alt={auction.title} />
                  <div className="time-left">{getTimeLeft(auction.endDate)}</div>
                </div>
                <div className="auction-details">
                  <h3>{auction.title}</h3>
                  <p>{auction.description}</p>
                  <div className="bid-info">
                    <div className="current-bid">
                      Current Bid: ${auction.highestBid || auction.startingBid}
                    </div>
                    <div className="bid-count">
                      {auction.bids?.length || 0} bids
                    </div>
                  </div>
                  {renderBidButton(auction)}
                  <div className="bid-history">
                    <h4>Bid History</h4>
                    <div className="bid-list">
                      {auction.bids?.slice().reverse().map(bid => (
                        <div key={bid.id} className="bid-item">
                          <span>${bid.amount}</span>
                          <span>{new Date(bid.timestamp).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default LiveAuctions; 