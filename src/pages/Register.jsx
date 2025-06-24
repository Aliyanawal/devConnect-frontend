import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // <-- imported here
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      errs.email = 'Please enter a valid Gmail address';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert('Registration successful!');
      navigate('/login');
    } else {
      const data = await res.json();
      alert(data.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register on DevConnect</h2>

        <label>Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          required
        />

        <label>Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your Gmail address"
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Password</label>
        <div className="password-input">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Create a password"
            required
          />
          <span onClick={() => setShowPass(!showPass)} className="eye-icon">
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Register</button>

        <p className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
