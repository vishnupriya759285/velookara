import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import {
  CalendarDays,
  Plus,
  Settings,
  ArrowLeft,
} from 'lucide-react';

interface NavTab {
  label: string;
  path: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
}

const tabs: NavTab[] = [
  {
    label: 'Browse Events',
    path: '/events',
    icon: <CalendarDays className="h-4 w-4" />,
  },
  {
    label: 'Create & Manage',
    path: '/admin/events',
    icon: <Settings className="h-4 w-4" />,
    requiresAuth: true,
  },
];

export default function EventNavBar() {
  const { user } = useAuth();
  const location = useLocation();

  const isRegistrationPage = location.pathname.includes('/register');

  const visibleTabs = tabs.filter(
    (tab) => !tab.requiresAuth || !!user
  );

  const isActive = (path: string) => {
    if (path === '/events') {
      return location.pathname === '/events';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left: Tabs */}
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {visibleTabs.map((tab) => {
              const active = isActive(tab.path);
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`
                    relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap
                    transition-all duration-200
                    ${
                      active
                        ? 'text-green-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-green-600 rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Registration page: show back link */}
            {isRegistrationPage && (
              <Link
                to="/events"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all whitespace-nowrap"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Events</span>
              </Link>
            )}
          </div>

          {/* Right: Quick action for logged-in users */}
          {user && !location.pathname.startsWith('/admin/events') && (
            <Link
              to="/admin/events"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 rounded-full transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Create Event
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
