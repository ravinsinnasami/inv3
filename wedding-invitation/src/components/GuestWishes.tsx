import { useState, useEffect } from 'react';
import './GuestWishes.css';

const GuestWishes = () => {
  const [wishes, setWishes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch wishes on component mount
  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const response = await fetch('http://localhost:3000/wishes');
      if (!response.ok) throw new Error('Failed to fetch wishes');
      const data = await response.json();
      setWishes(data);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    }
  };

  const submitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch('http://localhost:3000/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, message }),
      });
  
      // First check if response is HTML (error page)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('text/html') !== -1) {
        const html = await response.text();
        console.error('Server returned HTML:', html);
        throw new Error('Server error - check console');
      }
  
      // Then try to parse as JSON
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit wish');
      }
  
      setName('');
      setMessage('');
      setShowForm(false);
      await fetchWishes();
      
    } catch (error) {
      console.error('Full error:', error);
      alert(`Submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteWish = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this wish?');
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:3000/delete-wishes/${id}`, {
        method: 'DELETE',
      });
      fetchWishes();
    } catch (error) {
      console.error('Error deleting wish:', error);
    }
  };

  return (
    <div className="guest-wishes-container">
      <h2>Guest Wishes</h2>
      
      <button 
        className="add-wish-button"
        onClick={() => setShowForm(true)}
      >
        Leave Your Wish
      </button>

      {showForm && (
        <div className="wish-form-overlay">
          <div className="wish-form-container">
            <button 
              className="close-button"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
            <h3>Leave Your Wish</h3>
            <form onSubmit={submitWish}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      <div className="wishes-list">
        {wishes.length === 0 ? (
          <div className="no-wishes">Wishes will appear here</div>
        ) : (
          wishes.map((wish) => (
            <div key={wish.id} className="wish-card">
              <div className="wish-header">
                <h4>{wish.name}</h4>
                <button 
                  className="delete-button"
                  onClick={() => deleteWish(wish.id)}
                >
                  ×
                </button>
              </div>
              <p className="wish-message">{wish.message}</p>
              <p className="wish-date">
                {new Date(wish.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuestWishes;