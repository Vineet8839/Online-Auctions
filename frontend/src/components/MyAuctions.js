import React, { useState, useEffect } from 'react';
import './MyAuctions.css';
import { deleteAuctionEverywhere } from '../utils/auctionUtils';

function MyAuctions() {
  const [myAuctions, setMyAuctions] = useState([]);
  const [editingAuction, setEditingAuction] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadUserAuctions();
  }, []);

  const loadUserAuctions = () => {
    const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;
    const allAuctions = JSON.parse(localStorage.getItem('auctions')) || [];
    const userAuctions = allAuctions.filter(auction => auction.userId === userId);
    setMyAuctions(userAuctions);
  };

  const handleEdit = (auction) => {
    setEditingAuction({ ...auction });
  };

  const handleDelete = async (auctionId) => {
    if (window.confirm('Are you sure you want to delete this auction? This action cannot be undone.')) {
      const success = await deleteAuctionEverywhere(auctionId);
      
      if (success) {
        setMyAuctions(prev => prev.filter(a => a.id !== auctionId));
        setSuccessMessage('Auction deleted successfully');
      } else {
        setError('Error deleting auction. Please try again.');
      }
      
      setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 3000);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    if (new Date(editingAuction.endDate) <= new Date()) {
      setError('End date must be in the future');
      return;
    }

    const allAuctions = JSON.parse(localStorage.getItem('auctions')) || [];
    const updatedAuctions = allAuctions.map(auction => 
      auction.id === editingAuction.id ? editingAuction : auction
    );

    localStorage.setItem('auctions', JSON.stringify(updatedAuctions));
    setMyAuctions(updatedAuctions.filter(auction => auction.userId === editingAuction.userId));
    setEditingAuction(null);
    setSuccessMessage('Auction updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="my-auctions">
      <h2>My Auctions</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {editingAuction ? (
        <div className="edit-form-container">
          <form onSubmit={handleUpdate} className="edit-form">
            <h3>Edit Auction</h3>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={editingAuction.title}
                onChange={e => setEditingAuction({...editingAuction, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={editingAuction.description}
                onChange={e => setEditingAuction({...editingAuction, description: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Starting Bid</label>
              <input
                type="number"
                value={editingAuction.startingBid}
                onChange={e => setEditingAuction({...editingAuction, startingBid: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="datetime-local"
                value={editingAuction.endDate}
                onChange={e => setEditingAuction({...editingAuction, endDate: e.target.value})}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="save-button">Save Changes</button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setEditingAuction(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="auctions-grid">
          {myAuctions.map(auction => (
            <div key={auction.id} className="auction-card">
              {auction.imageUrl && (
                <div className="auction-image">
                  <img src={auction.imageUrl} alt={auction.title} />
                </div>
              )}
              <div className="auction-details">
                <h3>{auction.title}</h3>
                <p>{auction.description}</p>
                <div className="auction-info">
                  <span>Starting Bid: ${auction.startingBid}</span>
                  <span>Current Bid: ${auction.currentBid || auction.startingBid}</span>
                </div>
                <div className="auction-status">
                  <span className={new Date(auction.endDate) < new Date() ? 'ended' : 'active'}>
                    {new Date(auction.endDate) < new Date() ? 'Ended' : 'Active'}
                  </span>
                  <span>End Date: {new Date(auction.endDate).toLocaleDateString()}</span>
                </div>
                <div className="auction-actions">
                  <button 
                    onClick={() => handleEdit(auction)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(auction.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAuctions; 