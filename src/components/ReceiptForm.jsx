import React, { useState } from 'react';
import { createReceipt } from '../db/db';

const ReceiptForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('food');
  const [imageFile, setImageFile] = useState(null);
  const [isCameraView, setIsCameraView] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Placeholder for camera API usage and file handling
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    setUploading(true);
    const receiptData = {
      description: description,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(), // Store as standardized date string
      category: category,
      image: imageFile ? URL.createObjectURL(imageFile) : null, // Using object URL for local display in memory
      dateKey: new Date(date).getFullYear().toString() + '-' + new Date(date).getMonth().toString().padStart(2, '0') + '-' + new Date(date).getDate().toString().padStart(2, '0'),
    };

    try {
      await createReceipt(receiptData);
      alert("Receipt added successfully! Please refresh the list.");
      // Reset form and notify parent component (App.jsx)
      setDescription('');
      setAmount('');
      setImageFile(null);
    } catch (err) {
      console.error("Error saving receipt:", err);
      alert("Failed to save receipt. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Office supplies run"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount ($)</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 45.50"
          step="0.01"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="food">🍔 Food</option>
          <option value="fuel">⛽ Fuel/Car</option>
          <option value="supplies">📦 Supplies</option>
          <option value="office">🏢 Office</option>
          <option value="travel">✈️ Travel</option>
          <option value="other">🌍 Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Photo</label>
        <div className="flex gap-3">
            <button 
                type="button" 
                onClick={() => setIsCameraView(!isCameraView)}
                className={`px-3 py-2 rounded-md text-sm transition ${isCameraView ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
                {isCameraView ? '🔴 Cancel Camera' : '📷 Camera'}
            </button>
            <label htmlFor="file-upload" className={`cursor-pointer ${!isCameraView ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                Gallery Picker
                <input 
                    id="file-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                    disabled={isCameraView}
                />
            </label>
        </div>
        {isCameraView && (
            <button 
                type="button" 
                onClick={() => setIsCameraView(false)}
                className="mt-2 px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
                Use Camera (Simulation)
            </button>
        )}
        
        {imageFile && (
            <div className="mt-3 p-3 border border-dashed border-gray-300 bg-gray-50 text-center">
                <p className="text-sm text-gray-600 mb-2">Selected File: {imageFile.name}</p>
                {/* Placeholder for image preview */}
                <img src={URL.createObjectURL(imageFile)} alt="Preview" className="max-h-20 mx-auto rounded object-contain" />
            </div>
        )}
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full py-2 mt-4 text-lg font-semibold rounded-md transition duration-150 
        bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300"
      >
        {uploading ? 'Saving...' : 'Save Receipt'}
      </button>
    </form>
  );
};

export default ReceiptForm;