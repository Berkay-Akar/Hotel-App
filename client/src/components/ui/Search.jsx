import axiosInstance from '@/utils/axios';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Search() {
  const [destinations, setDestinations] = useState([]);
  const [date, setDate] = useState('');
  const [guestOptions, setGuestOptions] = useState([]);
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState('');
  const dates = ['1 Oca - 2 Oca', '3 Feb - 4 Feb', '5 Mar - 6 Mar']; // Replace with your date options

  useEffect(async () => {
    // Fetch destinations from the backend
    await axiosInstance
      .get('/getPlaces')
      .then((response) => response.json())
      .then((data) => setDestinations(data));

    // Fetch guest options from the backend
    await axiosInstance
      .get('/getMaxGuests')
      .then((response) => response.json())
      .then((data) => setGuestOptions(data));
  }, []);

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleGuestsChange = (event) => {
    setGuests(event.target.value);
  };

  const handleSearch = () => {
    // Handle search logic with selected values
    console.log('Search with:', destination, date, guests);
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
            <i className="fas fa-calendar-alt mr-2 text-gray-400"></i>
            <select
              value={date}
              onChange={handleDateChange}
              className="w-auto outline-none"
            >
              <option value="">Tarih aralığı</option>
              {dates.map((option) => (
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
