import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(["Rahul", "Kamal", "Sanak"]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newUser, setNewUser] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [claimedPoints, setClaimedPoints] = useState(null);

  const handleAddUser = async () => {
    if (!newUser.trim() || !imageFile) {
      alert("Please enter name and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newUser.trim());
    formData.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:5000/add-user", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUsers([...users, data.name]); // Optional: update with data.name
      setNewUser("");
      setImageFile(null);
      alert("User added successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add user.");
    }
  };

  const handleClaimPoints = () => {
    if (!selectedUser) {
      alert("Please select a user.");
      return;
    }

    const points = Math.floor(Math.random() * 10) + 1;
    setClaimedPoints({ user: selectedUser, points });

    // API call to backend to store claim can be done here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-800">
          🥇 Claim Points Portal
        </h1>

        {/* User Dropdown */}
        <label className="block text-gray-700 font-medium mb-1">
          Select User:
        </label>
        <select
          className="w-full border border-yellow-300 rounded-md px-4 py-2 mb-4 focus:ring-2 focus:ring-yellow-400 outline-none"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">-- Choose user --</option>
          {users.map((user, idx) => (
            <option key={idx} value={user}>
              {user}
            </option>
          ))}
        </select>

        {/* Claim Button */}
        <button
          onClick={handleClaimPoints}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md mb-4 transition"
        >
          Claim Random Points
        </button>

        {/* Claimed Result */}
        {claimedPoints && (
          <div className="bg-green-100 text-green-700 text-center p-2 rounded mb-4">
            🎉 <strong>{claimedPoints.user}</strong> got{" "}
            <strong>{claimedPoints.points}</strong> points!
          </div>
        )}

        {/* Add User Form */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-1">
            Add New User:
          </label>
          <input
            type="text"
            className="w-full border border-yellow-300 rounded-md px-4 py-2 mb-3 outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter new user name"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />

          <label className="block text-gray-700 font-medium mb-1">
            Upload Profile Image:
          </label>
          <input
            type="file"
            accept="image/*"
            className="mb-4"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <button
            onClick={handleAddUser}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Add User
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/leaderboard")}
            className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-md w-full sm:w-auto"
          >
            View Leaderboard
          </button>
          <button
            onClick={() => navigate("/history")}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md w-full sm:w-auto"
          >
            View Claim History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
