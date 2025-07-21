import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { handleClaimPoints } from "../components/claimPoints.jsx";
import "../index.css";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [claimedPoints, setClaimedPoints] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [userPoints, setUserPoints] = useState(0);

  const handleAddUser = async () => {
    if (!userName || !userImage) {
      alert("Please fill in the fields");
      return;
    }

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("image", userImage);
    formData.append("userPoints", userPoints);

    try {
      const response = await fetch("https://scorely-backend.onrender.com/createUser", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.userName) alert("User Created");
    } catch (err) {
      console.log("Error", err);
    }
  };

  const dropdownUsers = async () => {
    try {
      const response = await fetch("https://scorely-backend.onrender.com/sendUser", {
        method: "GET",
      });

      const data = await response.json();
      setAllUsers(data);
    } catch (err) {
      console.log("Error fetching users", err);
    }
  };

  useEffect(() => {
    dropdownUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-white to-yellow-50 text-gray-900">
      {/* Header */}
      <header className="text-center py-6 bg-yellow-100 shadow-md mb-8">
        <h1 className="text-5xl font-extrabold tracking-wider text-yellow-600">
          🏆 Claim Points Portal
        </h1>
        <p className="mt-2 text-yellow-800">
          Level up by claiming your daily rewards
        </p>

        {/* Top Navigation Buttons */}
        <div className="flex justify-center mt-4 gap-4">
          <NavLink
            to="/Leaderboard"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
          >
            🥇 View Leaderboard
          </NavLink>
          <NavLink
            to="/History"
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
          >
            📜 View History
          </NavLink>
        </div>
      </header>

      {/* Main Section */}
      <main className="px-4 md:px-12 py-10 space-y-10 max-w-6xl mx-auto">
        {/* Claim Section */}
        <section>
          <label className="block text-lg font-semibold mb-2">Select User:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <option value="">Choose user</option>
            {allUsers.map((user) => (
              <option key={user._id}>{user.userName}</option>
            ))}
          </select>

          {selectedUser && (
            <div className="mt-6 animate-fade-in">
              <div className="flex items-center gap-6 bg-yellow-50 p-4 rounded-xl border border-yellow-300 shadow transition-transform transform-gpu duration-500 ease-out scale-95 hover:scale-100">
                {allUsers
                  .filter((user) => user.userName === selectedUser)
                  .map((user) => (
                    <React.Fragment key={user._id}>
                      <img
                        src={`https://scorely-backend.onrender.com/${user.image}`}
                        alt={user.userName}
                        className="w-24 h-24 rounded-full border-4 border-yellow-500 shadow-lg"
                      />
                      <div>
                        <h2 className="text-2xl font-bold">{user.userName}</h2>
                        <p className="text-yellow-700 mt-1">
                          Points: {user.userPoints}
                        </p>
                      </div>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={() =>
                handleClaimPoints(selectedUser, setClaimedPoints, setAllUsers)
              }
              className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Claim Random Points
            </button>
          </div>

          {claimedPoints && (
            <div className="mt-4 bg-green-100 text-green-800 text-center p-3 rounded-lg shadow">
              🎉 <strong>{claimedPoints.user}</strong> got{" "}
              <strong>{claimedPoints.points}</strong> points!
            </div>
          )}
        </section>

        {/* Add User Form */}
        <section className="bg-white bg-opacity-80 p-6 rounded-xl shadow-xl border border-yellow-300">
          <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
          <input
            type="text"
            placeholder="Enter new user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-md bg-yellow-50 text-gray-900 border border-yellow-400 focus:outline-none"
          />

          <div className="mb-4">
  <label
    htmlFor="file-upload"
    className="inline-flex items-center gap-2 text-yellow-700 font-medium hover:underline cursor-pointer"
  >
    📷 Select profile image
  </label>
  <input
    id="file-upload"
    type="file"
    accept="image/*"
    onChange={(e) => setUserImage(e.target.files[0])}
    className="hidden"
  />
  {userImage && (
    <p className="mt-1 text-sm text-gray-600 italic truncate">
      Selected: <span className="font-semibold">{userImage.name}</span>
    </p>
  )}
</div>


          <div className="flex justify-center mt-4">
            <button
              onClick={handleAddUser}
              className="w-1/2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Add User
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
