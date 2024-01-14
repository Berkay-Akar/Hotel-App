import React, { useState, useEffect } from 'react';

function Search() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   // Replace with your backend API endpoint
  //   fetch('https://your-backend-endpoint/data')
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);

  return (
    <div className="">
      <div className="flex justify-between rounded-lg bg-white p-6 shadow-lg">
        <div className="grid grid-cols-3 gap-16">
          <div className="flex h-12 items-center rounded-lg border p-2">
            <i className="fas fa-search mr-2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Varış noktası"
              className="w-auto outline-none"
            />
          </div>
          <div className="flex h-12 items-center rounded-lg border p-2">
            <i className="fas fa-calendar-alt mr-2 text-gray-400"></i>
            <input
              type="text"
              placeholder="1 Oca - 2 Oca"
              className="w-auto outline-none"
            />
          </div>
          <div className="flex h-12 items-center rounded-lg border p-2">
            <i className="fas fa-user-friends mr-2 text-gray-400"></i>
            <input
              type="text"
              placeholder="2 misafir, 1 oda"
              className="w-auto outline-none"
            />
          </div>
        </div>
        <button className="col-span-3 w-52 rounded-lg bg-blue-500 p-2 text-white">
          Ara
        </button>
      </div>
    </div>
  );
}

export default Search;
