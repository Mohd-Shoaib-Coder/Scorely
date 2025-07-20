import React from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();

  const topThree = [
    {
      name: 'Bindas.',
      image: 'https://i.pravatar.cc/100?img=1',
      score: '8****8',
      rank: 2,
    },
    {
      name: 'Mystery billionaire',
      image: 'https://i.pravatar.cc/100?img=2',
      score: '9****9',
      rank: 1,
    },
    {
      name: 'COOL BOY',
      image: 'https://i.pravatar.cc/100?img=3',
      score: '6****5',
      rank: 3,
    },
  ];

  const others = [
    { name: '🇮🇳MRS.RAJPUT🇮🇳', score: '4****0', image: 'https://i.pravatar.cc/100?img=4' },
    { name: '🇺🇦PRITESH🇺🇦', score: '4****5', image: 'https://i.pravatar.cc/100?img=5' },
    { name: 'Mystery billionaire', score: '3****9', image: 'https://i.pravatar.cc/100?img=6' },
    { name: 'Devil', score: '0', image: 'https://i.pravatar.cc/100?img=7' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-50 p-4">
      {/* Navbar */}
      <div className="flex flex-col sm:flex-row justify-center items-center bg-white p-4 rounded-xl shadow-md mb-6 gap-4">
        
        <div className="flex gap-4 mt-2 sm:mt-0">
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md text-base font-medium"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/history')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-md text-base font-medium"
          >
            History
          </button>
        </div>
      </div>

      <div className="text-center text-yellow-800 font-bold text-2xl mb-4">Wealth Ranking</div>
      <div className="flex justify-center gap-4 mb-6">
        <button className="bg-white px-5 py-2 rounded-full text-sm font-medium shadow-md">Daily</button>
        <button className="bg-yellow-400 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md">Monthly</button>
      </div>

      <div className="flex justify-center items-end gap-4 mb-8">
        {topThree.map((user, i) => (
          <div
            key={i}
            className={`flex flex-col items-center bg-white rounded-xl p-4 shadow-lg w-24 ${
              user.rank === 1 ? 'scale-110 z-10 bg-yellow-100' : 'opacity-80'
            }`}
          >
            <div className={`w-12 h-12 rounded-full overflow-hidden mb-2 border-2 ${
              user.rank === 1 ? 'border-yellow-500' : 'border-gray-300'
            }`}>
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-xs text-gray-700 text-center font-semibold truncate w-full">{user.name}</div>
            <div className="text-xs text-yellow-600 font-bold">{user.score}</div>
            <div className="mt-2 text-sm font-bold text-yellow-500">
              {user.rank === 1 ? '👑' : user.rank === 2 ? '🥈' : '🥉'}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        {others.map((user, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
            <div className="flex items-center gap-3">
              <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full border" />
              <span className="text-sm font-medium text-gray-800 truncate max-w-[120px]">{user.name}</span>
            </div>
            <div className="text-yellow-600 font-bold text-sm">{user.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
