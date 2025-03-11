import "./AuthForm.scss";
import {useState} from 'react';
import { auth } from "../../firebase/config";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate


function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const {dispatch} = useUser();
  const navigate = useNavigate(); // Initialize useNavigate

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSignup (e: React.FormEvent) {
    e.preventDefault();
    setError("");

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
        // Signed up 
        dispatch({type: "setUser", payload: {userUID: userCredential.user.uid, email: userCredential.user.email}});
        navigate("/myWatchlist"); // Redirect after successful signup
    })
    .catch((error) => {
        setError(error.message);
    });
  }

  function handleLogin (e: React.FormEvent) {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
        // Signed in 
        dispatch({type: "setUser", payload: {userUID: userCredential.user.uid, email: userCredential.user.email}});
        navigate("/myWatchlist"); // Redirect after successful login
    })
    .catch((error) => {
        setError(error.message);
    });
  }

  function handlePasswordReset() {
    const email = prompt("Please enter your email");
    
    if(email){
        sendPasswordResetEmail(auth, email);
        alert("Email sent! Check your inbox for password reset instructions.");
    }
  }



  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        {isSignUp && (
          <input
            type="text"
            name="userName"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <p className="forgot-password" onClick={handlePasswordReset}>Forgot Password?</p>
        <button 
            type="submit"
            onClick={isSignUp ? handleSignup : handleLogin}
        >
            {isSignUp ? "Sign Up" : "Login"}
        </button>
        
        {
            error &&
            <div className="error">
                {error}
            </div>
        }

        <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
          {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;