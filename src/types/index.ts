export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  season: string;
  description: string;
  icon: string;
  location: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  weather_conditions: string[];
  is_healthy: boolean;
  calories: number;
  prep_time: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  benefits: string[];
  price_range: string;
}

export interface SearchFilters {
  category?: string;
  maxCalories?: number;
  maxPrepTime?: number;
  difficulty?: string;
  healthyOnly?: boolean;
}