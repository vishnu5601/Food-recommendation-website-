import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationSearch: (city: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onLocationSearch, 
  placeholder = "Search for food..." 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationQuery.trim()) {
      onLocationSearch(locationQuery);
      setShowLocationSearch(false);
      setLocationQuery('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none transition-colors bg-white shadow-sm"
          />
        </div>
      </form>

      {/* Location Search Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowLocationSearch(!showLocationSearch)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <MapPin className="w-4 h-4" />
          <span>Change location</span>
        </button>
      </div>

      {/* Location Search Bar */}
      {showLocationSearch && (
        <form onSubmit={handleLocationSearch} className="relative">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Enter city name..."
              className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-blue-50"
            />
          </div>
        </form>
      )}
    </div>
  );
};