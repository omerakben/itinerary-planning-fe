'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

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
    { name: 'Dashboard', href: '/' },
    { name: 'My Itineraries', href: '/trips' },
    { name: 'Create New', href: '/trips/new', highlight: true },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src="/logo.png" alt="Itinerary Logo" width={40} height={40} className="rounded-md" priority />
              <span className="ml-2 text-xl font-bold text-gray-800">Itinerary Planner</span>
            </Link>
          </div>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${item.highlight ? 'bg-blue-500 text-white hover:bg-blue-400 hover:text-black' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Search and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input type="search" placeholder="Search trips..." className="w-64 px-4 py-1 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit" className="absolute right-0 top-0 mt-1 mr-2" aria-label="Search">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Profile Dropdown */}
            <div className="relative">
              <button type="button" onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">{user?.email?.[0].toUpperCase() || 'U'}</div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                  <div className="py-1">
                    <button type="button" onClick={handleViewProfile} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </button>
                  </div>
                  <div className="py-1">
                    <button type="button" onClick={signOut} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 border-t border-red-100">
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
              {isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className={`block px-3 py-2 rounded-md text-base font-medium ${item.highlight ? 'bg-blue-500 text-white hover:bg-blue-400 hover:text-black' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <form onSubmit={handleSearch} className="relative">
                <input type="search" placeholder="Search trips..." className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
