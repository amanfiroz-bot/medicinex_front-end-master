import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
const Profile = () => {
  const Navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [User, setUser] = useState({});
  useEffect(() => {
    if (!isAuthenticated) {
      Navigate("/");
    }
    finduser();
  }, []);
  const finduser = async() => {
    try {
      const res = await Axios.get(`https://localhost:7258/api/Users/${user.UserId}`);
      // console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="m-3 text-dark p-1">
      <div className="row bg-dark text-white mx-2 p-2 rounded">Profile Details :</div>
      <div className="row mx-2 mt-1 bg-white rounded-top-2 p-1">
        <div className="col-5 py-1">Name</div>
        <div className="col-1 py-1">:</div>
        <div className="col-5 py-1">{User.name}</div>
      </div>
      <div className="row mx-2 bg-white p-1">
        <div className="col-5 py-1">Email</div>
        <div className="col-1 py-1">:</div>
        <div className="col-5 py-1">{User.email}</div>
      </div>
      <div className="row mx-2 bg-white rounded-bottom-1 p-1">
        <div className="col-5 py-1">UserType</div>
        <div className="col-1 py-1">:</div>
        <div className="col-5 py-1">{User.userType}</div>
      </div>
      <div className=" mt-5 mx-2 d-flex justify-content-around">
        <button className="btn btn-outline-info" onClick={()=>Navigate("/orders")}>Order</button>
        {user.Role === "Admin" ?
          <button className="btn btn-outline-info"
          onClick={()=>Navigate("/medicines")}>Medicines</button>
          :
          <button className="btn btn-outline-info" onClick={()=>Navigate("/shopping")}>Shopping</button>
        }
      </div>
    </div>
  )
}

export default Profile;
