import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing">
      <h1 className="title">Welcome to DevConnect</h1>
      <p className="subtitle">
        The hub where developers connect, showcase skills, and grow together.
      </p>
      <div className="button-group">
        <Link to="/register"><button className="btn teal-btn">Register</button></Link>
        <Link to="/login"><button className="btn grey-btn">Login</button></Link>
      </div>
    </div>
  );
};

export default LandingPage;
