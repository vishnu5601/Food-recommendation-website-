export class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor() {
    this.apiKey = import.meta.env.VITE_WEATHER_API_KEY || '';
  }

  async getCurrentWeather(lat: number, lon: number): Promise<any> {
    const response = await fetch(
      `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return response.json();
  }

  async getWeatherByCity(city: string): Promise<any> {
    const response = await fetch(
      `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return response.json();
  }

  getSeason(month: number): string {
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  }

  getWeatherCondition(weatherCode: number): string {
    if (weatherCode >= 200 && weatherCode < 300) return 'stormy';
    if (weatherCode >= 300 && weatherCode < 600) return 'rainy';
    if (weatherCode >= 600 && weatherCode < 700) return 'snowy';
    if (weatherCode >= 700 && weatherCode < 800) return 'foggy';
    if (weatherCode === 800) return 'clear';
    return 'cloudy';
  }
}