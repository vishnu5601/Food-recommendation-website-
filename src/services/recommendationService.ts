import type { FoodItem, WeatherData } from '../types';

export class RecommendationService {
  getRecommendations(foods: FoodItem[], weather: WeatherData): FoodItem[] {
    const { temperature, condition, season, humidity } = weather;
    
    const scored = foods.map(food => ({
      ...food,
      score: this.calculateScore(food, temperature, condition, season, humidity)
    }));

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }

  private calculateScore(
    food: FoodItem,
    temperature: number,
    condition: string,
    season: string,
    humidity: number
  ): number {
    let score = 0;

    // Temperature-based scoring
    if (temperature <= 10) {
      // Cold weather - prefer warm, hearty foods
      if (food.weather_conditions.includes('cold') || 
          food.weather_conditions.includes('winter') ||

          food.category === 'salads' ||
          food.category === 'ice_cream') {
        score += 50;
      }
    }

    // Condition-based scoring
    if (condition === 'rainy' && food.weather_conditions.includes('rainy')) score += 30;
    if (condition === 'sunny' && food.weather_conditions.includes('sunny')) score += 30;
    if (condition === 'cloudy' && food.weather_conditions.includes('cloudy')) score += 20;

    // Season-based scoring
    if (food.weather_conditions.includes(season)) score += 25;

    // Humidity-based scoring
    if (humidity > 70 && food.weather_conditions.includes('humid')) score += 20;
    if (humidity < 40 && food.weather_conditions.includes('dry')) score += 20;

    // Healthy bonus
    if (food.is_healthy) score += 15;

    // Add some randomness to avoid same order
    score += Math.random() * 10;

    return score;
  }

  searchFoods(foods: FoodItem[], query: string): FoodItem[] {
    const lowerQuery = query.toLowerCase();
    
    return foods.filter(food => 
      food.name.toLowerCase().includes(lowerQuery) ||
      food.description.toLowerCase().includes(lowerQuery) ||
      food.category.toLowerCase().includes(lowerQuery) ||
      food.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(lowerQuery)
      )
    );
  }
}