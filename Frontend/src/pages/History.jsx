import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const res = await fetch("https://scorely-backend.onrender.com/history");
      const data = await res.json();
      setHistory(data);
    };

    getHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-white to-yellow-50 text-gray-900">
      {/* Header */}
      <header className="text-center py-6 bg-yellow-100 shadow-md mb-8">
        <h1 className="text-4xl font-extrabold tracking-wider text-yellow-600">
          📜 Claim History
        </h1>
        <p className="mt-2 text-yellow-800">Track who claimed what & when</p>

        {/* Navigation Buttons (Same style as bottom) */}
        <div className="flex justify-center gap-4 mt-6">
          <NavLink
            to="/"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium shadow transition"
          >
            ⬅️ Back to Home
          </NavLink>
          <NavLink
            to="/leaderboard"
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium shadow transition"
          >
            🥇 View Leaderboard
          </NavLink>
        </div>
      </header>

      {/* Claim History List */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 space-y-4">
        {history.length === 0 ? (
          <p className="text-center text-gray-500">No claim history yet.</p>
        ) : (
          history.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-yellow-200 bg-yellow-50 rounded-xl transform transition duration-300 hover:scale-[1.01] hover:shadow-sm"
            >
              <div>
                <div className="font-semibold text-gray-800 text-sm sm:text-base">
                  {entry.userName}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(entry.claimedAt).toLocaleString()}
                </div>
              </div>

              <div className="text-yellow-600 font-bold text-sm sm:text-base">
                +{entry.points}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
