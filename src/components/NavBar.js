'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { CloseIcon, DashboardIcon, ItinerariesIcon, MenuIcon, PlusIcon, SearchIcon } from './Icons';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/trips?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleViewProfile = () => {
    setIsProfileOpen(false);
    router.push('/profile');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: DashboardIcon },
    { name: 'My Itineraries', href: '/trips', icon: ItinerariesIcon },
    { name: 'Create Trip', href: '/trips/new', highlight: true, icon: PlusIcon },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src="/logo.png" alt="Itinerary Planner Logo" width={44} height={44} className="object-contain" priority />
              <span className="ml-3 text-xl font-bold text-gray-800">
                <span className="hidden lg:inline">Itinerary Planner</span>
                <span className="lg:hidden">IP</span>
              </span>
            </Link>
          </div>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2
                  ${item.highlight ? 'bg-blue-500 text-white hover:bg-blue-400' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                {item.icon && <item.icon className={item.highlight ? 'text-white' : 'text-gray-500'} />}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side - Search and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input type="search" placeholder="Search trips..." className="w-48 lg:w-64 px-4 py-1 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit" className="absolute right-0 top-0 mt-1 mr-2" aria-label="Search">
                <SearchIcon className="text-gray-500" />
              </button>
            </form>

            {/* Profile Dropdown */}
            <div className="relative">
              <button type="button" onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {(() => {
                    const fullName = user?.profile?.name || user?.displayName || '';
                    const [firstName, lastName] = fullName.split(' ');
                    return ((firstName?.[0] || '') + (lastName?.[0] || '')).toUpperCase() || 'IP';
                  })()}
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                  <div className="py-1">
                    <button type="button" onClick={handleViewProfile} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </button>
                  </div>
                  <div className="py-1">
                    <button type="button" onClick={signOut} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium
                  ${item.highlight ? 'bg-blue-500 text-white hover:bg-blue-400' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                {item.icon && <item.icon className={item.highlight ? 'text-white' : 'text-gray-500'} />}
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="px-3 py-2">
              <form onSubmit={handleSearch} className="relative">
                <input type="search" placeholder="Search trips..." className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit" className="absolute right-3 top-2.5" aria-label="Search">
                  <SearchIcon className="text-gray-500" />
                </button>
              </form>
            </div>
            <button type="button" onClick={handleViewProfile} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              Profile
            </button>
            <button type="button" onClick={signOut} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
