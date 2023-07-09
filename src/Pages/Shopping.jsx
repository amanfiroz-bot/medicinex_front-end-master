import { useContext, useEffect, useState } from "react";
import Axios from 'axios';
import MedicineItem from "../Components/MedicineItem";
import { AuthContext } from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
const Shopping = () => {
    const Navigate=useNavigate();
    const {isAuthenticated}=useContext(AuthContext);
    const [show,setshow]=useState(!isAuthenticated);
    const [Medicines, setMedicines] = useState([]);
    useEffect(() => {
        allmedicines();
    },[]);
    const allmedicines = async () => {
        try {
            const res = await Axios.get("https://localhost:7258/api/Medicines");
            setMedicines(res.data);
            console.log(res.data);
        }catch(err) {
            console.log(err);
        }
    }
    const NotLoginUser=()=>{
        setshow(false)
        Navigate("/login");
    }
    return (
        <div className="bg-white m-3 rounded-1">
            <div className="fs-3 mx-2 px-3 rounded-2 bg-dark text-light">Medicine</div>
            <div className="MedicineList d-flex flex-wrap justify-content-around">
                {Medicines.map((item) => (
                    <MedicineItem item={item}/>
                ))}
            </div>
            {show && 
                <div className={"alert d-flex justify-content-between position-absolute top-50 start-50 translate-middle alert-success"} role="alert">
                    Please Login
                    <button type="button" className="btn-close" onClick={NotLoginUser}></button>
                </div>
            }
        </div>
    )
}

export default Shopping;
