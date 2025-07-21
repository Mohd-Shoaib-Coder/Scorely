import { NavLink } from 'react-router-dom';
import { useState,useEffect } from 'react';




const Leaderboard = () => {
  
const[users,setUsers]=useState([]);


useEffect(()=>{

    const fetchLeaderboard=async()=>{

      try{

        const response=await fetch("http://localhost:4000/sendUser",{

          method:"GET",
        })

        const data=await response.json();
        const sorted=data.sort((a,b)=> b.userPoints -a.userPoints);
        setUsers(sorted);
      }catch(error){

        console.log("Error fetching leaderboard",error)
      }
    }

fetchLeaderboard();

},[])


const topThree=users.slice(0,3);
const others=users.slice(3)


  return (
     <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-white to-yellow-50 text-gray-900">
      {/* Header like Home.jsx */}
      <header className="text-center py-6 bg-yellow-100 shadow-md mb-8">
        <h1 className="text-4xl font-extrabold tracking-wider text-yellow-600">
          🥇 Wealth Leaderboard
        </h1>
        <p className="mt-2 text-yellow-800">Discover the top wealth holders</p>

        <div className="flex justify-center mt-4 gap-4">
          <NavLink
            to="/"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
          >
            Home
          </NavLink>
          <NavLink
            to="/history"
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
          >
            History
          </NavLink>
        </div>
      </header>

      {/* Top 3 */}
      <div className="flex justify-center items-end gap-6 mb-10 flex-wrap">
        {topThree.map((user, i) => (
          <div
            key={user._id}
            className={`relative flex flex-col items-center bg-white rounded-2xl p-4 shadow-lg w-28 sm:w-32 transform transition duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl ${
              i === 0 ? 'scale-110 z-10 bg-yellow-50 border-2 border-yellow-300' : 'opacity-90'
            }`}
          >
            <div className="absolute -top-4 -left-4 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow">
              #{i + 1}
            </div>
            <div
              className={`w-16 h-16 rounded-full overflow-hidden border-4 mb-2 ${
                i === 0 ? 'border-yellow-500' : 'border-gray-300'
              }`}
            >
              <img
                src={`http://localhost:4000/${user.image}`}
                alt={user.userName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs sm:text-sm text-gray-800 font-semibold text-center truncate w-full">
              {user.userName}
            </div>
            <div className="text-yellow-600 font-bold text-sm">{user.userPoints}</div>
            <div className="mt-2 text-xl">
              {i === 0 ? "👑" : i === 1 ? "🥈" : "🥉"}
            </div>
          </div>
        ))}
      </div>

      {/* Others */}
      <div className="bg-white rounded-2xl shadow-md p-4 space-y-3 max-w-2xl mx-auto">
        {others.map((user, i) => (
          <div
            key={user._id}
            className="flex items-center justify-between py-3 px-4 border border-yellow-200 bg-yellow-50 rounded-xl transform transition duration-300 hover:scale-[1.01] hover:shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="text-yellow-600 font-bold text-sm w-6">#{i + 4}</span>
              <img
                src={`http://localhost:4000/${user.image}`}
                alt={user.userName}
                className="w-10 h-10 rounded-full border border-yellow-300"
              />
              <span className="text-sm font-medium text-gray-800 truncate max-w-[140px]">
                {user.userName}
              </span>
            </div>
            <div className="text-yellow-600 font-bold text-sm">{user.userPoints}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
