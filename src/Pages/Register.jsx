import { useContext, useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../Components/AuthProvider";
const Register = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const Navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [Registers, setRegister] = useState({
    "name": "",
    "password": "",
    "email": "",
    "userType": "Customer"
  });
  useEffect(() => {
    if (isAuthenticated) {
      Navigate("/profile");
    }
  }, []);
  const handleInput = (event) => {
    console.log("skldnvfksdn");
    const { name, value } = event.target;
    setRegister((prev) => {
      return { ...prev, [name]: value };
    });
  }
  const handleSave=async()=>{
    console.log(Registers);
    try {
      const res = Axios.post("https://localhost:7258/api/Users", Registers);
      setshow(true);
      setTimeout(()=>Navigate("/login"),1000);
      console.log(res);
    } catch (err) { 
      console.log(err);
    }
  }
  return (
    <div className="SignUp mt-4">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">

        <div className="container h-100">

          <div className="row d-flex justify-content-center align-items-center h-100">

            <div className="col-12 col-md-9 col-lg-7 col-xl-6">

              <div className="card" style={{ borderradius: '15px' }}>

                <div className="card-body p-5">

                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                  <form>
                    <div className="form-outline mb-4">

                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-control form-control-lg" value={Registers.name} onChange={handleInput} name="name" />


                    </div>
                    <div className="form-outline mb-4">

                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-control form-control-lg" value={Registers.email} onChange={handleInput} name="email" />
                    </div>
                    <div className="form-outline mb-4">

                      <label className="form-label">Password</label>
                      <input type="password" className="form-control form-control-lg" value={Registers.password} onChange={handleInput} name="password" />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="button"
                        className="btn btn-outline-success btn-block btn-lg gradient-custom-4 text-body" onClick={handleSave}>Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && 
        <div className={"alert d-flex justify-content-between position-absolute top-50 start-50 translate-middle alert-success"} role="alert">
              Register Successfully
              <button type="button" className="btn-close" onClick={()=>setshow(false)}></button>
          </div>
      }
    </div>
  );

}
export default Register;  