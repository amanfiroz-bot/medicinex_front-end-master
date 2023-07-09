import { useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { AuthContext } from "../Components/AuthProvider";

const Login = () => {
  const {login,isAuthenticated}=useContext(AuthContext);
  const Navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [Login, setLogin] = useState({
    "password": "",
    "email": "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      Navigate("/profile");
    }
  }, []);
  const handleInput = (event) => {
    const { name, value } = event.target;
    setLogin((prev) => {
      return { ...prev, [name]: value };
    });
  }
  const handleSave=async()=> {
    // console.log(Login);
    try {
      const res = await Axios.post("https://localhost:7258/api/Users/LoginUser", Login);
      setshow(true);
      setTimeout(() => Navigate("/login"), 1000);
      // console.log(res.data);
      login(res.data);
      // console.log(isAuthenticated);
      Navigate("/profile");
    } catch (err) { 
      console.log(err);
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center">
        <div className="m-5 bg-white p-3 rounded w-50">
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" value={Login.email} onChange={handleInput} />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={Login.password} onChange={handleInput}/>
        </div>
        <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-success btn-lg py-1" onClick={handleSave}>Login</button>
        </div>
        </div>
    </div>
  )
}

export default Login;
