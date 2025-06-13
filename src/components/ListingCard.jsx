import { Link } from 'react-router-dom';
import './ListingCard.css';

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listings/${listing.id}`} className="listing-card">
      <div className="card">
        <img
          src={listing.image || 'https://via.placeholder.com/400x250'}
          alt={listing.title}
          className="card-image"
        />
        <div className="card-body">
          <h2 className="card-title">{listing.title}</h2>
          <p className="card-location">{listing.location}</p>
          <p className="card-price">₹{listing.price}/night</p>
        </div>
      </div>
    </Link>
  );
}
