import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Input, Loading, MainLayout } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Mail, Lock, LogIn, Sparkles, Shield, User } from 'lucide-react';

/**
 * Bright Liquid Glass Login
 * Premium entrance for the ThaiLearner platform
 */
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const token = sessionStorage.getItem('auth.jwt');
    const role = sessionStorage.getItem('userRole');
    
    if (token && role) {
      if (role === 'ADMIN') {
        navigate("/admin"); 
      } else {
        navigate("/"); 
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    try {
      await login(email, password);
      const role = sessionStorage.getItem('userRole');
      if (role === 'ADMIN') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout showNavbar={false}>
      <div className="min-h-screen flex items-center justify-center py-12 px-6">
        <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-700">
          {/* Logo & Header */}
          <div className="text-center space-y-6">
            <Link to="/" className="inline-flex items-center space-x-3 group brightness-110">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/40 group-hover:scale-110 transition-transform duration-500">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </Link>
            <div className="space-y-2">
              <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
                Welcome <span className="text-blue-600">Back</span>
              </h2>
              <p className="text-gray-400 font-medium">
                Continue your journey with <span className="text-gray-900 font-bold">ThaiLearner</span>
              </p>
            </div>
          </div>

          {/* Login Form */}
          <Card className="p-0 overflow-hidden shadow-2xl shadow-blue-900/10">
            <CardHeader className="py-6 px-10 text-center bg-white/40 border-b border-white/60">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Secure Access</span>
            </CardHeader>
            <CardBody className="p-10">
              <form className="space-y-8" onSubmit={handleLogin}>
                {error && (
                  <div className="rounded-2xl bg-red-50/50 border border-red-100 p-4 text-center animate-in shake duration-500">
                    <p className="text-xs font-black text-red-600 uppercase tracking-widest">{error}</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center ml-1">
                      <Mail className="w-3 h-3 mr-1.5" /> Email Address
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center ml-1">
                      <Lock className="w-3 h-3 mr-1.5" /> Password
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="xl"
                  disabled={loading || !email.trim() || !password.trim()}
                >
                  {loading ? (
                    <div className="flex items-center space-x-3">
                      <Loading size="sm" />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Demo Accounts */}
          <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
            <div className="glass-card p-4 rounded-2xl border border-white/60 hover:border-blue-200 transition-colors group">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Admin Role</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 transition-colors">admin1@lms.local</p>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-white/60 hover:border-indigo-200 transition-colors group">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Student Role</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 group-hover:text-indigo-600 transition-colors">user1@lms.local</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-400">
              New here? <Link to="/public" className="text-blue-600 font-bold hover:underline">Explore Public Courses</Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;
