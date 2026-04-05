import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const result = await login(email, password);
        
        if (result.success) {
            navigate('/shop'); // Redirect to shop on success
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem' }}>
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '3rem', borderRadius: '10px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', textTransform: 'uppercase', color: 'var(--primary)' }}>Login</h2>
                
                {error && (
                    <div style={{ backgroundColor: 'rgba(255,0,0,0.1)', color: '#ff4444', padding: '10px', borderRadius: '5px', marginBottom: '1rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                        <Mail style={{ position: 'absolute', top: '12px', left: '15px', color: 'var(--text-gray)' }} size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: 'white' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '2rem', position: 'relative' }}>
                        <Lock style={{ position: 'absolute', top: '12px', left: '15px', color: 'var(--text-gray)' }} size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: 'white' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Sign In
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-gray)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Register Here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
