// src/components/AdminControls.tsx
import React, { useState } from 'react';

interface AdminControlsProps {
  onResetWishes: () => void;
  onDeleteWish: (id: number) => void;
  isAdmin: boolean;
}

const AdminControls: React.FC<AdminControlsProps> = ({ onResetWishes, onDeleteWish, isAdmin }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  
  // This should be replaced with a proper authentication system
  const adminPassword = 'wedding2025'; // Change this!
  
  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };
  
  if (!isAdmin) return null;
  
  if (!authenticated) {
    return (
      <div className="my-4 p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">Admin Access</h3>
        <form onSubmit={handleAuthenticate}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="px-3 py-2 border rounded-md mr-2"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
  
  return (
    <div className="my-4 p-4 border border-red-200 rounded-md bg-red-50">
      <h3 className="text-lg font-medium mb-4">Admin Controls</h3>
      
      {showConfirm ? (
        <div className="mb-4">
          <p className="font-bold text-red-600 mb-2">Are you sure you want to delete ALL wishes?</p>
          <div className="flex space-x-2">
            <button 
              onClick={() => {
                onResetWishes();
                setShowConfirm(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Yes, Delete All
            </button>
            <button 
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setShowConfirm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 mb-4"
        >
          Reset All Wishes
        </button>
      )}
      
      <p className="text-sm text-gray-600 mb-4">To delete individual wishes, use the delete button on each wish.</p>
      
      <button 
        onClick={() => setAuthenticated(false)}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminControls;