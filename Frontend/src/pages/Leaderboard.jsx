import { NavLink } from 'react-router-dom';

const Leaderboard = () => {
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
        {topThree
          .sort((a, b) => a.rank - b.rank)
          .map((user, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center bg-white rounded-2xl p-4 shadow-lg w-28 sm:w-32 transform transition duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl ${
                user.rank === 1 ? 'scale-110 z-10 bg-yellow-50 border-2 border-yellow-300' : 'opacity-90'
              }`}
            >
              <div className="absolute -top-4 -left-4 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow">
                #{user.rank}
              </div>
              <div
                className={`w-16 h-16 rounded-full overflow-hidden border-4 mb-2 ${
                  user.rank === 1 ? 'border-yellow-500' : 'border-gray-300'
                }`}
              >
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-xs sm:text-sm text-gray-800 font-semibold text-center truncate w-full">
                {user.name}
              </div>
              <div className="text-yellow-600 font-bold text-sm">{user.score}</div>
              <div className="mt-2 text-xl">
                {user.rank === 1 ? '👑' : user.rank === 2 ? '🥈' : '🥉'}
              </div>
            </div>
          ))}
      </div>

      {/* Others List */}
      {/* Others List */}
<div className="bg-white rounded-2xl shadow-md p-4 space-y-3 max-w-2xl mx-auto">
  {others.map((user, i) => (
    <div
      key={i}
      className="flex items-center justify-between py-3 px-4 border border-yellow-200 bg-yellow-50 rounded-xl transform transition duration-300 hover:scale-[1.01] hover:shadow-sm cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <span className="text-yellow-600 font-bold text-sm w-5">#{i + 4}</span>
        <img
          src={user.image}
          alt={user.name}
          className="w-10 h-10 rounded-full border border-yellow-300"
        />
        <span className="text-sm font-medium text-gray-800 truncate max-w-[140px]">
          {user.name}
        </span>
      </div>
      <div className="text-yellow-600 font-bold text-sm">{user.score}</div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Leaderboard;
