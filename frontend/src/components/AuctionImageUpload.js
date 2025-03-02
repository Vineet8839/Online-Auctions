import React, { useState } from 'react';
import axios from 'axios';

const AuctionImageUpload = ({ auctionId }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });

        try {
            const response = await axios.post(
                `/api/auctions/${auctionId}/images`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            alert('Images uploaded successfully!');
            setFiles([]);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload images');
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(Array.from(e.target.files))}
            />
            <button type="submit" disabled={uploading || files.length === 0}>
                {uploading ? 'Uploading...' : 'Upload Images'}
            </button>
        </form>
    );
};

export default AuctionImageUpload; 