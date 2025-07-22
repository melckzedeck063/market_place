import React, { useState } from 'react';
import {
  BellIcon,
  HotelIcon,
  LayoutDashboardIcon,
  List,
  LogOutIcon,
  User2Icon,
  UserCircle,
  Users2Icon,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

export default function MainLayout({ children, page }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setTimeout(() => {
      navigate('/');
      setTimeout(() => {
        sessionStorage.removeItem('dmz-token');
      }, 500);
    }, 1000);
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon /> },
    { to: '/restaurants', label: 'Restaurants', icon: <HotelIcon /> },
    { to: '/orders', label: 'Orders', icon: <List /> },
    { to: '/users', label: 'Users', icon: <Users2Icon /> },
    { to: '/profile', label: 'My Profile', icon: <UserCircle /> },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={classNames(
          'fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white shadow-lg',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'sm:translate-x-0'
        )}
      >
        <div className="h-full px-4 py-6 overflow-y-auto">
          <div className="text-orange-500 text-2xl font-bold mb-8">Food Recipe</div>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    classNames(
                      'flex items-center p-2 rounded-lg transition',
                      isActive
                        ? 'bg-orange-100 text-orange-600 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    )
                  }
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-6 left-4 right-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-4 py-2 text-sm"
            >
              <LogOutIcon className="mr-2" size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 sm:ml-64 flex flex-col min-h-screen bg-gray-100">
        {/* Top Bar */}
        <div className="sticky top-0 bg-white border-b h-16 flex items-center justify-between px-4 z-20">
          {/* Toggle button for small screens */}
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="sm:hidden text-gray-600 hover:text-orange-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="font-bold text-xl text-orange-500">{page}</div>

          <div className="flex items-center space-x-4">
            <BellIcon className="text-gray-600" />
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <User2Icon />
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 flex-grow">{children}</div>
      </div>
    </div>
  );
}
