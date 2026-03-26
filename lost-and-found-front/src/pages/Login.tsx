import { useState } from "react";
import { getUser } from "../api/User";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import type { User } from "../types";
import { useAuth } from "../AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleLogin = async () => {
    try {
      const response: User = await getUser(email, password);
      if (response) {
        login(response);
        alert("Success!");
        navigate("/");
      } else {
        alert("Error");
      }
    } catch(error) {
      if(isAxiosError(error)) {
        alert(error.response?.data.detail);
      } else {
        alert(error);
      }
    }

  }


  return (
    <>
      <div className="page-title container-fluid text-center">
        <h2>
          Admin Login
        </h2>
      </div>
      <div className="login-form d-flex flex-column justify-content-center">
        <div className="row">
          <label className="col-4 text-start">Email address: </label>
          <input className="col-8" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="row">
          <label className="col-4 text-start">Password: </label>
          <input className="col-8" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleLogin}> Proceed to login </button>
        </div>

      </div>
    </>
  );
};

export default Login;