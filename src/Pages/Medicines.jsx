import { useContext, useEffect, useState } from "react";
import Axios from 'axios';
import { AuthContext } from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import MMedicineItem from "../Components/MMedicineItem";
import AddMedicine from "../Components/AddMedicine";
const Medicines = () => {
    const Navigate=useNavigate();
    const {isAuthenticated}=useContext(AuthContext);
    const [showModel,setshowModel]=useState(false);
    const [Medicines, setMedicines] = useState([]);
    useEffect(() => {
        allmedicines();
    },[showModel]);
    const allmedicines = async () => {
        try {
            const res = await Axios.get("https://localhost:7258/api/Medicines");
            setMedicines(res.data);
            console.log(res.data);
        }catch(err) {
            console.log(err);
        }
    }
    const handleClose=()=>{
        setshowModel(!showModel);
    }
    return (
        <div className="m-3">
            <div className="bg-dark text-light p-2 rounded d-flex justify-content-between align-items-center">
                <span>All Medicine List:</span> 
                <button className="btn btn-primary py-1" onClick={handleClose}>Add medicine</button> 
            </div>
            <div className="allMedicineList mt-2 py-1 bg-white">
                {Medicines.map((item) => (
                        <MMedicineItem item={item}/>
                    ))}
            </div>
            {/* hide date */}
            <AddMedicine show={showModel} handleClose={handleClose}/>
        </div>
    );
}

export default Medicines;
