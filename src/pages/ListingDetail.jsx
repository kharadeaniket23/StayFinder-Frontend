import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import './ListingDetail.css';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/listings/${id}`)
      .then((res) => {
        setListing(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch listing:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="detail-container">Loading...</div>;
  }

  if (!listing) {
    return <div className="detail-container">Listing not found.</div>;
  }

  return (
    <div className="detail-container">
      <h1 className="detail-title">{listing.title}</h1>
      <img
        src={listing.image || 'https://via.placeholder.com/600x400'}
        alt={listing.title}
        className="detail-image"
      />
      <div className="detail-info">
        <p><strong>Location:</strong> {listing.location}</p>
        <p><strong>Price:</strong> ₹{listing.price} / night</p>
        <p className="detail-description">{listing.description}</p>
      </div>
    </div>
  );
}
