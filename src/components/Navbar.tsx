import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Button } from './ui/button';
import { Menu, X, LogOut, Home, FileText, MessageSquare, LayoutDashboard, Bell, PawPrint, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import PanchayatSelector from './PanchayatSelector';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Panchayat Selector */}
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:opacity-90 transition-opacity text-lg font-semibold hidden sm:block">
              Kerala
            </Link>
            <PanchayatSelector />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 hover:text-green-100 transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/notices" className="flex items-center gap-2 hover:text-green-100 transition-colors">
              <Bell className="h-4 w-4" />
              <span>Notices</span>
            </Link>
            <Link to="/stray-dog-report" className="flex items-center gap-2 hover:text-green-100 transition-colors">
              <PawPrint className="h-4 w-4" />
              <span>Stray Dogs</span>
            </Link>
            <Link to="/events" className="flex items-center gap-2 hover:text-green-100 transition-colors">
              <CalendarDays className="h-4 w-4" />
              <span>Events</span>
            </Link>
            
            {user ? (
              <>
                {user.role === 'citizen' && (
                  <>
                    <Link to="/post-issue" className="flex items-center gap-2 hover:text-green-100 transition-colors">
                      <FileText className="h-4 w-4" />
                      <span>Post Issue</span>
                    </Link>
                    <Link to="/my-issues" className="flex items-center gap-2 hover:text-green-100 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span>My Issues</span>
                    </Link>
                  </>
                )}
                
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin" className="flex items-center gap-2 hover:text-green-100 transition-colors">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                    <Link to="/admin/events" className="flex items-center gap-2 hover:text-green-100 transition-colors">
                      <CalendarDays className="h-4 w-4" />
                      <span>Manage Events</span>
                    </Link>
                  </>
                )}
                
                <div className="flex items-center gap-3 ml-2 pl-4 border-l border-white/20">
                  <div className="text-right">
                    <div className="text-sm">{user.name}</div>
                    <div className="text-xs text-green-100 capitalize">{user.role}</div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => navigate('/login')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  size="sm"
                  className="bg-white text-green-700 hover:bg-green-50"
                >
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/notices"
                className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bell className="h-4 w-4" />
                <span>Notice Board</span>
              </Link>
              <Link
                to="/stray-dog-report"
                className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <PawPrint className="h-4 w-4" />
                <span>Stray Dog Report</span>
              </Link>
              <Link
                to="/events"
                className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <CalendarDays className="h-4 w-4" />
                <span>Events</span>
              </Link>
              
              {user ? (
                <>
                  {user.role === 'citizen' && (
                    <>
                      <Link
                        to="/post-issue"
                        className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Post Issue</span>
                      </Link>
                      <Link
                        to="/my-issues"
                        className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>My Issues</span>
                      </Link>
                    </>
                  )}
                  
                  {user.role === 'admin' && (
                    <>
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                      <Link
                        to="/admin/events"
                        className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <CalendarDays className="h-4 w-4" />
                        <span>Manage Events</span>
                      </Link>
                    </>
                  )}
                  
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <div className="px-2 py-1 text-sm">
                      <div>{user.name}</div>
                      <div className="text-xs text-green-100 capitalize">{user.role}</div>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-white hover:bg-white/10 mt-2"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 border-t border-white/20 pt-2 mt-2">
                  <Button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    size="sm"
                    className="w-full bg-white text-green-700 hover:bg-green-50"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
