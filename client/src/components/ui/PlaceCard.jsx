import { UserContext } from '@/providers/UserProvider';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  const { user } = useContext(UserContext);
  const { _id: placeId, photos, address, title, price } = place;
  let discountedPrice = price - (price * 20) / 100;
  return (
    <Link to={`/place/${placeId}`} className="m-4 flex flex-col md:m-2 xl:m-0">
      <div className="card ">
        {photos?.[0] && (
          <img
            src={`${photos?.[0]}`}
            className="h-4/5 w-full rounded-xl object-cover"
          />
        )}
        <h2 className="truncate font-bold">{address}</h2>
        <h3 className="truncate text-sm text-gray-500">{title}</h3>
        {user ? (
          <div className="mt-1">
            <span className="font-semibold">
              <del className="text-gray-500">${price} per night</del>
              {' $' + discountedPrice + ' per night'}
            </span>
          </div>
        ) : (
          <div className="mt-1">
            <span className="font-semibold">${price} per night </span>
            <p>Log in to see special price</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PlaceCard;
