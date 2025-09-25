import { useState, useEffect } from 'react';
import { WeatherService } from '../services/weatherService';
import type { WeatherData } from '../types';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const weatherService = new WeatherService();

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await weatherService.getCurrentWeather(lat, lon);
      
      const weatherData: WeatherData = {
        temperature: Math.round(data.main.temp),
        condition: weatherService.getWeatherCondition(data.weather[0].id),
        humidity: data.main.humidity,
        season: weatherService.getSeason(new Date().getMonth() + 1),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        location: `${data.name}, ${data.sys.country}`
      };
      
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await weatherService.getWeatherByCity(city);
      
      const weatherData: WeatherData = {
        temperature: Math.round(data.main.temp),
        condition: weatherService.getWeatherCondition(data.weather[0].id),
        humidity: data.main.humidity,
        season: weatherService.getSeason(new Date().getMonth() + 1),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        location: `${data.name}, ${data.sys.country}`
      };
      
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Fallback to default city
          fetchWeatherByCity('New York');
        }
      );
    } else {
      fetchWeatherByCity('New York');
    }
  }, []);

  return {
    weather,
    loading,
    error,
    fetchWeatherByLocation,
    fetchWeatherByCity
  };
};