import React, { useState, useEffect } from 'react';

const FilterControls = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    // Use the prop setter (onFilterChange) to update the parent state immediately
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setFilters({ category: '', startDate: '', endDate: '' });
    onFilterChange({ category: '', startDate: '', endDate: '' });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          id="category-filter"
          value={filters.category}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All Categories</option>
          <option value="food">🍔 Food</option>
          <option value="fuel">⛽ Fuel/Car</option>
          <option value="supplies">📦 Supplies</option>
          <option value="office">🏢 Office</option>
          <option value="travel">✈️ Travel</option>
          <option value="other">🌍 Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
        <input
          type="date"
          id="start-date"
          value={filters.startDate}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
        <input
          type="date"
          id="end-date"
          value={filters.endDate}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div className="sm:col-span-3 flex justify-between items-center pt-2">
        <button
          onClick={handleReset}
          type="button"
          className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
        >
          Reset Filters
        </button>
        <button
          onClick={() => onFilterChange(filters)}
          type="button"
          className="px-6 py-2 text-sm bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterControls;