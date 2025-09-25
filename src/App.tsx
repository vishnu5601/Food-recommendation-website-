import React, { useState, useEffect } from 'react';
import { Utensils, RefreshCw, Filter } from 'lucide-react';
import { useWeather } from './hooks/useWeather';
import { RecommendationService } from './services/recommendationService';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { FoodCard } from './components/FoodCard';
import { CategoryFilter } from './components/CategoryFilter';
import { LoadingSpinner } from './components/LoadingSpinner';
import { mockFoodData } from './data/mockFoodData';
import type { FoodItem } from './types';

function App() {
  const { weather, loading, error, fetchWeatherByCity } = useWeather();
  const [foods, setFoods] = useState<FoodItem[]>(mockFoodData);
  const [displayedFoods, setDisplayedFoods] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(true);

  const recommendationService = new RecommendationService();

  useEffect(() => {
    if (weather && showRecommendations) {
      const recommendations = recommendationService.getRecommendations(foods, weather);
      setDisplayedFoods(recommendations);
    } else {
      setDisplayedFoods(foods);
    }
  }, [weather, foods, showRecommendations]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowRecommendations(false);
    
    if (query.trim() === '') {
      setDisplayedFoods(foods);
      return;
    }

    const searchResults = recommendationService.searchFoods(foods, query);
    setDisplayedFoods(searchResults);
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    setShowRecommendations(false);
    
    if (category === null) {
      setDisplayedFoods(foods);
    } else {
      const filtered = foods.filter(food => food.category === category);
      setDisplayedFoods(filtered);
    }
  };

  const handleRefreshRecommendations = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setShowRecommendations(true);
    if (weather) {
      const recommendations = recommendationService.getRecommendations(foods, weather);
      setDisplayedFoods(recommendations);
    }
  };

  const handleLocationSearch = (city: string) => {
    fetchWeatherByCity(city);
  };

  if (loading && !weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-gray-600 mt-4">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                ClimaCrave
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefreshRecommendations}
                className="flex items-center space-x-2 bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Weather Section */}
        {weather && (
          <div className="mb-8">
            <WeatherCard weather={weather} />
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Search Section */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            onLocationSearch={handleLocationSearch}
            placeholder="Search for healthy food recommendations..."
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryFilter}
          />
        </div>

        {/* Recommendations Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {showRecommendations && weather 
                  ? `Perfect for ${weather.temperature}°C ${weather.condition} weather` 
                  : searchQuery 
                    ? `Search results for "${searchQuery}"` 
                    : selectedCategory 
                      ? `${selectedCategory.replace('_', ' ').charAt(0).toUpperCase() + selectedCategory.replace('_', ' ').slice(1)} dishes`
                      : 'All Dishes'
                }
              </h2>
              <p className="text-gray-600 mt-1">
                {showRecommendations 
                  ? 'AI-powered recommendations based on your local weather'
                  : `${displayedFoods.length} dishes found`
                }
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Filter className="w-4 h-4" />
              <span>Smart filtering enabled</span>
            </div>
          </div>
        </div>

        {/* Food Grid */}
        {displayedFoods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {displayedFoods.map((food) => (
              <FoodCard 
                key={food.id} 
                food={food}
                onClick={() => console.log('Food clicked:', food.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No dishes found matching your criteria.</p>
            <button
              onClick={handleRefreshRecommendations}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              View All Recommendations
            </button>
          </div>
        )}

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Why ClimaCrave?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Weather-Smart Recommendations</h4>
              <p className="text-gray-600 text-sm">Get food suggestions perfectly tailored to your local weather conditions and season.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Healthy Choices</h4>
              <p className="text-gray-600 text-sm">Focus on nutritious options that boost your health based on weather patterns.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Real-time Updates</h4>
              <p className="text-gray-600 text-sm">Fresh recommendations that update with changing weather conditions throughout the day.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">ClimaCrave</span>
            </div>
            <p className="text-gray-600">Eat right for the weather. Stay healthy, stay happy.</p>
            <p className="text-gray-400 text-sm mt-2">© 2025 ClimaCrave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;