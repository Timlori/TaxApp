import React from 'react';

const ReceiptList = ({ receipts, onDeleteReceipt }) => {
  if (!receipts || receipts.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-xl font-medium text-gray-500">No receipts found.</p>
        <p className="text-gray-400 mt-1">Use the form to add receipts or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {receipts.map(receipt => (
        <div key={receipt.id} className="border-b pb-6 last:border-b-0 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 shadow-sm hover:shadow-md transition duration-100 rounded-lg">
          
          {/* Left Section: Details */}
          <div className="flex-grow space-y-1">
            <div className="flex items-center space-x-4 mb-1">
                <span className="text-xs font-medium text-indigo-600 bg-indigo-100 py-1 px-2 rounded-full">{receipt.category}</span>
                <span className="text-sm text-gray-500">
                    {new Date(receipt.date).toLocaleDateString()}
                </span>
            </div>
            
            <p className="text-xl font-semibold text-gray-800">{receipt.description}</p>
            <p className="text-lg font-bold text-red-700">${parseFloat(receipt.amount).toFixed(2)}</p>
          </div>
          
          {/* Middle Section: Image */}
          <div className="max-w-xs w-full sm:w-auto flex-shrink-0 mt-2 sm:mt-0 sm:mr-6">
            <img 
              src={receipt.image || '/placeholder-receipt.png'} // Use placeholder if no image
              alt={`Receipt for ${receipt.description}`} 
              className="w-full h-auto object-contain border border-gray-200 rounded-md p-1"
            />
            {receipt.image && <p className="text-xs text-gray-500 mt-1">Image available</p>}
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0 pt-2 sm:pt-0">
            <button 
                onClick={() => onDeleteReceipt(receipt.id)}
                className="text-sm text-red-500 hover:underline transition duration-100"
            >
                Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceiptList;