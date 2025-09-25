import React from 'react';
import { Clock, Users, Flame, Heart, Star } from 'lucide-react';
import type { FoodItem } from '../types';

interface FoodCardProps {
  food: FoodItem;
  onClick?: () => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={food.image_url} 
          alt={food.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {food.is_healthy && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <Heart className="w-3 h-3 fill-current" />
            <span>Healthy Choice</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-sm font-semibold text-gray-800">{food.price_range}</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
            {food.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.5</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{food.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{food.prep_time} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Flame className="w-4 h-4" />
              <span>{food.calories} cal</span>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(food.difficulty)}`}>
            {food.difficulty}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {food.ingredients.slice(0, 3).map((ingredient, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {ingredient}
            </span>
          ))}
          {food.ingredients.length > 3 && (
            <span className="text-xs text-gray-500">
              +{food.ingredients.length - 3} more
            </span>
          )}
        </div>

        <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-[1.02]">
          View Recipe
        </button>
      </div>
    </div>
  );
};