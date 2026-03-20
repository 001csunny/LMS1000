import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import conf from '../conf/main';
import { Trophy, Flame, Crown, Medal, User } from 'lucide-react';
import { Card, CardHeader, CardBody } from './ui';

/**
 * Bright Liquid Glass Leaderboard
 * Real-time ranking with premium aesthetic
 */
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

  const getRankIcon = (index) => {
    switch(index) {
      case 0: return <Crown className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />;
      case 1: return <Medal className="w-5 h-5 text-gray-400 fill-gray-400/20" />;
      case 2: return <Medal className="w-5 h-5 text-amber-600 fill-amber-600/20" />;
      default: return <span className="text-xs font-black text-gray-300">#{index + 1}</span>;
    }
  };

  return (
    <Card className="max-w-sm w-full p-0 overflow-hidden" hover>
      <CardHeader className="flex justify-between items-center py-6 px-8 bg-white/40 border-b border-white/60">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
            <Trophy className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-black text-gray-900 tracking-tight leading-none">Top Learners</h2>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live</span>
        </div>
      </CardHeader>
      
      <CardBody className="p-6 space-y-4">
        {leaderboard.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400 space-y-3">
            <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest">Syncing Rankings</span>
          </div>
        ) : (
          leaderboard.map((user, index) => (
            <div 
              key={user.id} 
              className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-300 group ${
                index === 0 ? 'bg-gradient-to-r from-yellow-50/50 to-transparent border border-yellow-100/50' : 
                'hover:bg-white/40 hover:border-white/60'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-6 flex items-center justify-center">
                  {getRankIcon(index)}
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-white/60 shadow-sm flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.username}&background=3b82f6&color=fff`}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {index === 0 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-sm" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-gray-900 leading-none mb-1">
                    {user.username}
                  </span>
                  <div className="flex items-center text-[10px] font-black text-orange-500 uppercase tracking-wider">
                    <Flame className="w-3 h-3 mr-1" />
                    {user.streak} Day Streak
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-sm font-black text-blue-600 leading-none">{user.xp}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">XP</span>
              </div>
            </div>
          ))
        )}
      </CardBody>
    </Card>
  );
};

export default Leaderboard;
