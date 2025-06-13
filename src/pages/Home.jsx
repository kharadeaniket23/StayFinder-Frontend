import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ListingCard from '../components/ListingCard';
import './Home.css';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/listings')
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch listings:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="home-container">Loading listings...</div>;
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Available Stays</h1>
      {listings.length > 0 ? (
        <div className="listing-grid">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p>No listings found.</p>
      )}
    </div>
  );
}
