import React from 'react';
import { Coffee, Soup, Salad, IceCream, Pizza, Cake } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categories = [
  { id: 'all', name: 'All', icon: null },
  { id: 'soups', name: 'Soups', icon: Soup },
  { id: 'salads', name: 'Salads', icon: Salad },
  { id: 'main_course', name: 'Main Course', icon: Pizza },
  { id: 'cold_drinks', name: 'Drinks', icon: Coffee },
  { id: 'desserts', name: 'Desserts', icon: Cake },
  { id: 'ice_cream', name: 'Ice Cream', icon: IceCream },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id || (selectedCategory === null && category.id === 'all');
        const Icon = category.icon;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id === 'all' ? null : category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              isSelected
                ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span className="font-medium">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};