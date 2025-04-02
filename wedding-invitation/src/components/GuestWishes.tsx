// src/components/GuestWishes.tsx
import React, { useState, useEffect } from 'react';
import AdminControls from './AdminControls';

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

const API_URL = 'http://localhost:3001/api';

const GuestWishes: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [isAdmin, setIsAdmin] = useState(false);

  // Toggle admin mode with a keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsAdmin(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    checkApiConnection();
  }, []);

  useEffect(() => {
    if (apiStatus === 'connected') {
      fetchWishes();
    }
  }, [apiStatus]);

  const checkApiConnection = async () => {
    try {
      const response = await fetch(`${API_URL}/test`);
      if (response.ok) {
        setApiStatus('connected');
      } else {
        throw new Error('API not responding properly');
      }
    } catch (error) {
      setApiStatus('error');
      setError(`Cannot connect to server at ${API_URL}. Please check if the backend is running.`);
    }
  };

  const fetchWishes = async () => {
    try {
      const response = await fetch(`${API_URL}/wishes`);
      if (!response.ok) {
        throw new Error(`Failed to fetch wishes: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setWishes(data);
    } catch (error) {
      setError('Could not load wishes. Please try again later.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name || !newWish.message) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/wishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWish),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(`Failed to submit wish: ${response.status} ${responseData.error || response.statusText}`);
      }
      
      setNewWish({ name: '', message: '' });
      fetchWishes();
    } catch (error) {
      setError(`Failed to send your wish: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWish = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/wishes/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete wish');
      }
      
      fetchWishes();
    } catch (error) {
      setError(`Failed to delete wish: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleResetWishes = async () => {
    try {
      const response = await fetch(`${API_URL}/wishes/reset`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to reset wishes');
      }
      
      fetchWishes();
    } catch (error) {
      setError(`Failed to reset wishes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Guest Wishes</h2>
      
      {apiStatus === 'error' && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">
          {error}
          <button 
            onClick={checkApiConnection}
            className="ml-2 px-2 py-1 bg-red-200 rounded-md hover:bg-red-300"
          >
            Retry
          </button>
        </div>
      )}
      
      {error && apiStatus !== 'error' && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}
      
      <AdminControls 
        isAdmin={isAdmin}
        onResetWishes={handleResetWishes}
        onDeleteWish={handleDeleteWish}
      />
      
      {/* Submit form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
          <input
            type="text"
            id="name"
            value={newWish.name}
            onChange={(e) => setNewWish({...newWish, name: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            required
            disabled={apiStatus !== 'connected'}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium mb-1">Your Wishes</label>
          <textarea
            id="message"
            value={newWish.message}
            onChange={(e) => setNewWish({...newWish, message: e.target.value})}
            className="w-full px-3 py-2 border rounded-md h-24"
            required
            disabled={apiStatus !== 'connected'}
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting || apiStatus !== 'connected'}
          className="w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:bg-pink-300"
        >
          {isSubmitting ? 'Sending...' : 'Send Wishes'}
        </button>
      </form>
      
      {/* Wishes list */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-2">Previous Wishes</h3>
        {apiStatus === 'checking' && <p className="text-center">Connecting to server...</p>}
        {apiStatus === 'connected' && wishes.length === 0 && (
          <p className="text-center text-gray-500">Be the first to send your wishes!</p>
        )}
        {apiStatus === 'connected' && wishes.map((wish) => (
          <div key={wish.id} className="p-4 border rounded-md">
            <div className="flex justify-between">
              <h4 className="font-medium">{wish.name}</h4>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  {new Date(wish.timestamp).toLocaleDateString()}
                </span>
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteWish(wish.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            <p className="mt-2">{wish.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestWishes;