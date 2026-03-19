import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import conf from '../conf/main';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Determine WS protocol based on configured HTTP prefix
    const url = new URL(conf.urlPrefix);
    const wsProto = url.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${wsProto}//${url.host}/leaderboard`;

    // Connect to WebSocket namespace /leaderboard
    const socket = io(wsUrl, {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('Leaderboard WebSocket Connected:', socket.id);
    });

    socket.on('leaderboard', (data) => {
      setLeaderboard(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 shadow-sm max-w-sm w-full font-thai">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">ผู้ทำคะแนนสูงสุด (Leaderboard)</h2>
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
      
      <div className="space-y-4">
        {leaderboard.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-4">กำลังโหลดข้อมูล...</div>
        ) : (
          leaderboard.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <span className={`w-6 text-center font-bold ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  index === 2 ? 'text-amber-600' : 'text-gray-300'
                }`}>
                  #{index + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 flex items-center justify-center text-sm font-bold text-blue-600">
                  {user.username?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    {user.username}
                  </span>
                  <span className="text-xs text-orange-500 font-medium">
                    🔥 {user.streak} วัน
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-sm font-bold text-gray-800">{user.xp}</span>
                <span className="text-xs text-gray-400">XP</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
