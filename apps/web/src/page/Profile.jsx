import React, { useEffect, useState } from "react";
import { MainLayout, Card, CardHeader, CardBody, Button, Input, Loading } from "../components/ui";
import { useProgressStore } from "../store/useProgressStore";
import authService from "../services/AuthService";
import { 
  User as UserIcon, 
  Mail, 
  Key, 
  Trophy, 
  Flame, 
  CheckCircle, 
  Camera,
  Edit3,
  Save,
  X
} from "lucide-react";

function Profile() {
  const { myProgress, fetchDashboardData, isLoading: isProgressLoading } = useProgressStore();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUserInfo();
    setUserData(user);
    if (user) {
      setEditData({
        username: user.username,
        email: user.email,
        speechToken: user.speechToken || ""
      });
    }
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call (replace with actual update if needed)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      // In a real app, we'd update the local storage/store here
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!userData || isProgressLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading size="lg" />
        </div>
      </MainLayout>
    );
  }

  const completedLessons = myProgress.filter(p => p.status === 'COMPLETED').length;
  const totalXP = userData.xp || 0;
  const streak = userData.streak || 0;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="flex items-center space-x-8">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
                <img
                  src={`https://ui-avatars.com/api/?name=${userData.username}&background=3b82f6&color=fff&size=200`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 z-20 p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </button>
              <div className="absolute -inset-2 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
                {userData.username}
              </h1>
              <div className="flex items-center space-x-3">
                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  {userData.role}
                </span>
                <span className="flex items-center text-gray-500 text-sm font-medium">
                  <Flame className="w-4 h-4 text-orange-500 mr-1" />
                  {streak} Day Streak
                </span>
              </div>
            </div>
          </div>
          
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="flex flex-col items-center justify-center py-10" hover>
            <div className="p-4 bg-blue-50 rounded-2xl mb-4">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <span className="text-4xl font-black text-gray-900 mb-1">{totalXP}</span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total XP</span>
          </Card>
          
          <Card className="flex flex-col items-center justify-center py-10" hover>
            <div className="p-4 bg-orange-50 rounded-2xl mb-4">
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
            <span className="text-4xl font-black text-gray-900 mb-1">{streak}</span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Daily Streak</span>
          </Card>

          <Card className="flex flex-col items-center justify-center py-10" hover>
            <div className="p-4 bg-green-50 rounded-2xl mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <span className="text-4xl font-black text-gray-900 mb-1">{completedLessons}</span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Lessons Finished</span>
          </Card>
        </div>

        {/* User Info & Settings */}
        <Card className="p-0 overflow-hidden">
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <UserIcon className="w-5 h-5 text-blue-600" />
              <span className="font-black text-lg">Account Information</span>
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} loading={isSaving}>
                  Save Changes
                </Button>
              </div>
            )}
          </CardHeader>
          <CardBody className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                  <UserIcon className="w-3 h-3 mr-1.5" /> Username
                </label>
                {isEditing ? (
                  <Input 
                    value={editData.username} 
                    onChange={(e) => setEditData({...editData, username: e.target.value})}
                  />
                ) : (
                  <p className="text-lg font-bold text-gray-700">{userData.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                  <Mail className="w-3 h-3 mr-1.5" /> Email Address
                </label>
                {isEditing ? (
                  <Input 
                    value={editData.email} 
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                  />
                ) : (
                  <p className="text-lg font-bold text-gray-700">{userData.email}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                  <Key className="w-3 h-3 mr-1.5" /> Google Speech Token (API)
                </label>
                {isEditing ? (
                  <Input 
                    value={editData.speechToken} 
                    placeholder="Enter your API token..."
                    onChange={(e) => setEditData({...editData, speechToken: e.target.value})}
                  />
                ) : (
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/60 font-mono text-xs text-gray-500 break-all">
                    {userData.speechToken || "No token configured"}
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
}

export default Profile;
