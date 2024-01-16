import axiosInstance from '@/utils/axios';
import { usePlaces } from '../../../hooks';
import React, { useEffect, useState } from 'react';
import { set } from 'date-fns';

function Search() {
  const Places = usePlaces();
  const { setPlaces, setLoading } = Places;
  const [destination, setDestination] = useState('');
  const destinations = ['Istanbul', 'Ankara', 'Izmir'];
  const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const [guests, setGuests] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleGuestsChange = (event) => {
    setGuests(event.target.value);
  };

  const handleSearch = async (e) => {
    try {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
      // Make a GET request to the search endpoint with the selected parameters
      const searchResponse = await axiosInstance.get('/places/search', {
        params: {
          address: destination.toLocaleLowerCase(),
          maxGuests: guests,
        },
      });
      setLoading(true);
      setSearchTimeout(
        setTimeout(async () => {
          const { data } = await axiosInstance.get('/places/search', {
            params: {
              address: destination.toLocaleLowerCase(),
              maxGuests: guests,
            },
          });
          const searchResults = searchResponse.data.places;
          setPlaces(searchResults);
          setLoading(false);
        }, 500),
      );
      // Handle the search results as needed, e.g., update state or perform actions

      console.log('Search results:', searchResults);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between rounded-lg bg-white p-6 shadow-lg">
        <div className="grid grid-cols-3 gap-16">
          <div className="flex h-12 items-center rounded-lg border p-2">
            <i className="fas fa-search mr-2 text-gray-400"></i>
            <select
              value={destination}
              onChange={handleDestinationChange}
              className="w-auto outline-none"
            >
              <option value="">Varış noktası</option>
              {destinations.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex h-12 items-center rounded-lg border p-2">
            <i className="fas fa-user-friends mr-2 text-gray-400"></i>
            <select
              value={guests}
              onChange={handleGuestsChange}
              className="w-auto outline-none"
            >
              <option value="">Misafir ve oda sayısı</option>
              {guestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="col-span-3 w-52 rounded-lg bg-blue-500 p-2 text-white"
        >
          Ara
        </button>
      </div>
    </div>
  );
}

export default Search;
