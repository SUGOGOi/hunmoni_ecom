import { useState } from "react";
import {
  registerWithEmail,
  loginWithGoogle,
} from "../../services/firebaseAuthServices";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(null);
    try {
      await registerWithEmail(email, password, name);
      alert("Registered!");
    } catch (error) {
      console.log(error);
      alert(`error`);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      alert("Registered with Google!");
    } catch (error) {
      alert(`error`);
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <button onClick={handleGoogleRegister}>Register with Google</button>
      {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
    </div>
  );
};

export default Register;
