import { useState, useEffect } from 'react';
import axios from 'axios';
import { X, CheckCircle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, selectedClass, classes }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        classTitle: '',
        date: '',
        time: '',
        notes: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({ ...prev, classTitle: selectedClass || (classes[0]?.title || '') }));
            setStatus('idle');
            setErrorMessage('');
        }
    }, [isOpen, selectedClass, classes]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic frontend validation
        if (!formData.name || !formData.email || !formData.classTitle || !formData.date) {
            setErrorMessage('Please fill out all required fields.');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            await axios.post('http://localhost:5000/api/bookings', formData);
            setStatus('success');
            setTimeout(() => {
                onClose();
            }, 3000); // Close automatically after 3s
        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage(error.response?.data?.message || 'Failed to book the class. Please try again.');
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 9999, padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '8px',
                width: '100%', maxWidth: '500px', position: 'relative', border: '1px solid #333'
            }}>
                <button 
                    onClick={onClose}
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: 'var(--text-gray)', cursor: 'pointer' }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                    Book <span className="text-neon">Class</span>
                </h2>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <CheckCircle size={64} style={{ color: 'var(--primary)', margin: '0 auto 1rem' }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-light)' }}>Booking Confirmed!</h3>
                        <p style={{ color: 'var(--text-gray)' }}>You have successfully booked {formData.classTitle}. We'll see you there!</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {errorMessage && (
                            <div style={{ padding: '10px', backgroundColor: 'rgba(255,0,0,0.1)', border: '1px solid red', color: 'red', borderRadius: '4px' }}>
                                {errorMessage}
                            </div>
                        )}
                        
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>Full Name *</label>
                            <input 
                                type="text" name="name" value={formData.name} onChange={handleChange} required
                                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
                            />
                        </div>
                        
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>Email Address *</label>
                            <input 
                                type="email" name="email" value={formData.email} onChange={handleChange} required
                                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
                            />
                        </div>
                        
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>Select Class *</label>
                            <select 
                                name="classTitle" value={formData.classTitle} onChange={handleChange} required
                                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
                            >
                                {classes.map(cls => (
                                    <option key={cls.id} value={cls.title}>{cls.title}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>Date *</label>
                                <input 
                                    type="date" name="date" value={formData.date} onChange={handleChange} required
                                    style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>Time</label>
                                <input 
                                    type="time" name="time" value={formData.time} onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>Notes (Optional)</label>
                            <textarea 
                                name="notes" value={formData.notes} onChange={handleChange} rows="3"
                                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid #333', color: 'white', borderRadius: '4px', resize: 'vertical' }}
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={status === 'loading'}
                            className="btn btn-primary" 
                            style={{ width: '100%', marginTop: '1rem', opacity: status === 'loading' ? 0.7 : 1 }}
                        >
                            {status === 'loading' ? 'Processing...' : 'Confirm Booking'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
