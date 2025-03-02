export const deleteAuctionEverywhere = async (auctionId) => {
  try {
    // 1. Remove from all auctions
    const allAuctions = JSON.parse(localStorage.getItem('auctions')) || [];
    const updatedAuctions = allAuctions.filter(a => a.id !== auctionId);
    localStorage.setItem('auctions', JSON.stringify(updatedAuctions));

    // 2. Remove from bids
    const allBids = JSON.parse(localStorage.getItem('bids')) || [];
    const updatedBids = allBids.filter(bid => bid.auctionId !== auctionId);
    localStorage.setItem('bids', JSON.stringify(updatedBids));

    // 3. Remove from user's saved/watching auctions
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => ({
      ...user,
      savedAuctions: (user.savedAuctions || []).filter(id => id !== auctionId),
      watchingAuctions: (user.watchingAuctions || []).filter(id => id !== auctionId)
    }));
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // 4. Remove from notifications
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const updatedNotifications = notifications.filter(n => n.auctionId !== auctionId);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

    // 5. Remove any associated images or files
    const auctionImages = JSON.parse(localStorage.getItem('auctionImages')) || {};
    delete auctionImages[auctionId];
    localStorage.setItem('auctionImages', JSON.stringify(auctionImages));

    // 6. Trigger update event
    window.dispatchEvent(new Event('auctionsUpdated'));

    return true;
  } catch (error) {
    console.error('Error deleting auction:', error);
    return false;
  }
}; 