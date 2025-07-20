import React from "react";
import { NavLink } from "react-router";

const History = () => {
  const historyData = [
    {
      user: "Rahul",
      points: 7,
      date: "2025-07-20",
      time: "10:32 AM",
    },
    {
      user: "Kamal",
      points: 4,
      date: "2025-07-19",
      time: "03:21 PM",
    },
    {
      user: "Sanak",
      points: 10,
      date: "2025-07-18",
      time: "08:45 AM",
    },
  ];

  return (



    













    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-50 p-6">





<div className="flex flex-col sm:flex-row justify-center items-center bg-white p-4 rounded-xl shadow-md mb-6 gap-4">
        
        <div className="flex gap-4 mt-2 sm:mt-0">
          <NavLink to="/"
        
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md text-base font-medium"
          >
            Home
          </NavLink>
          <NavLink to="/Leaderboard"
            
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-md text-base font-medium"
          >
            Leaderboard
          </NavLink>
        </div>
      </div>





      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-yellow-800 mb-6">
          📜 Claim Points History
        </h1>

        {historyData.length === 0 ? (
          <p className="text-center text-gray-500">No history available.</p>
        ) : (
          <ul className="space-y-4">
            {historyData.map((entry, index) => (
              <li
                key={index}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-lg font-semibold text-gray-700">
                    {entry.user}
                  </span>
                  <span className="text-sm text-gray-500">
                    {entry.date} at {entry.time}
                  </span>
                </div>
                <div className="text-yellow-600 font-bold text-sm">
                  🎯 Claimed {entry.points} points
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;
