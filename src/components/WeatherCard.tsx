import React from 'react';
import { Cloud, Sun, CloudRain, Snowflake, Wind, Droplets } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case 'clear':
      return <Sun className="w-8 h-8" />;
    case 'cloudy':
      return <Cloud className="w-8 h-8" />;
    case 'rainy':
      return <CloudRain className="w-8 h-8" />;
    case 'snowy':
      return <Snowflake className="w-8 h-8" />;
    default:
      return <Wind className="w-8 h-8" />;
  }
};

const getWeatherColor = (condition: string) => {
  switch (condition) {
    case 'clear':
      return 'from-yellow-400 to-orange-500';
    case 'cloudy':
      return 'from-gray-400 to-gray-600';
    case 'rainy':
      return 'from-blue-400 to-blue-600';
    case 'snowy':
      return 'from-blue-200 to-blue-400';
    default:
      return 'from-gray-300 to-gray-500';
  }
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className={`bg-gradient-to-r ${getWeatherColor(weather.condition)} rounded-2xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-full">
            {getWeatherIcon(weather.condition)}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{weather.temperature}°C</h3>
            <p className="text-white/80 capitalize">{weather.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium">{weather.location}</p>
          <div className="flex items-center space-x-2 text-sm text-white/80 mt-1">
            <Droplets className="w-4 h-4" />
            <span>{weather.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};