import React, { useState, useEffect, useCallback } from 'react';
import { getAllReceipts, getReceiptsByFilter, deleteReceipt } from '../db/db';
import ReceiptForm from './components/ReceiptForm';
import ReceiptList from './components/ReceiptList';
import FilterControls from './components/FilterControls';
import './index.css';

const App = () => {
  const [receipts, setReceipts] = useState([]);
  const [filter, setFilter] = useState({ category: '', startDate: '', endDate: '' });
  const [loading, setLoading] = useState(true);

  // Load receipts based on current filter
  const loadReceipts = useCallback(async (currentFilter) => {
    setLoading(true);
    try {
      const loadedReceipts = await getReceiptsByFilter(currentFilter);
      setReceipts(loadedReceipts);
    } catch (error) {
      console.error("Error loading receipts:", error);
      alert("Failed to load receipts. See console for details.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReceipts(filter);
  }, [filter, loadReceipts]);

  // Expose loading state and update function for child components
  // (Handled by passing setters/functions down)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8 pb-4 border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
        <h1 className="text-4xl font-bold text-gray-800">💰 Tax Receipt Tracker</h1>
        <p className="text-gray-600 mt-1">Local, secure, and simple tracking for tax season.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: Form/Input */}
        <aside className="lg:col-span-1">
          <div className="p-6 bg-white shadow-xl rounded-lg sticky top-20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add New Receipt</h2>
            <ReceiptForm />
          </div>
        </aside>

        {/* Column 2 & 3: List/Filters */}
        <main className="lg:col-span-2">
          {/* Filter Controls */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Filter Receipts</h2>
            <FilterControls onFilterChange={(f) => setFilter({...filter, ...f})} />
          </div>

          {/* Receipt List */}
          <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                {loading ? 'Loading Receipts...' : `Saved Receipts (${receipts.length})`}
            </h2>
            <ReceiptList receipts={receipts} onDeleteReceipt={handleDelete} />
            
            {/* Export button (will implement summary generation later) */}
             <div className="mt-8 pt-6 border-t flex justify-end">
                <button 
                    onClick={() => alert('Export Feature: Implement CSV generation based on visible receipts.')}
                    className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition duration-150 cursor-pointer"
                >
                    Export Summary (CSV)
                </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
        </main>
      </div>
    </div>
  );
};

export default App;