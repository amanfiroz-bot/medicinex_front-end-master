import { useNavigate, useParams } from "react-router-dom";
import Axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { AuthContext } from "./AuthProvider";
const BuyItem = () => {
  const [Message, setMessage] = useState("");
  const [show,setshow]=useState(false);
  const Navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const { Mid } = useParams();
  const [Medicine, setMedicine] = useState({});
  const [Quantity, setQuantity] = useState(1);
  const [Price, setPrice] = useState(0);
  const date = new Date(Medicine.expDate).toLocaleDateString();

  useEffect(() => {
    findMedicine();
  }, []);

  useEffect(() => {
    funprice();
  }, [Quantity, Medicine]);

  const findMedicine = async () => {
    try {
      const res = await Axios(`https://localhost:7258/api/Medicines/${Mid}`);
      setMedicine(res.data);
      // console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const increase = () => {
    if (Medicine.quantity - 1 >= Quantity) {
      setQuantity(Quantity + 1);
    }
  }

  const decrease = () => {
    if (Quantity > 1) {
      setQuantity(Quantity - 1);
    }
  }

  const funprice = () => {
    setPrice(Quantity * Medicine.price);
  }
  ///Place Order Function
  const OrderPlace = async () => {
    const data={
      "userId": user.UserId,
      "medicineId": Mid,
      "quantity": Quantity,
      "total": Price
    }
    try {
      const res = await Axios.post("https://localhost:7258/api/Orders", data);
      console.log(res);
      setMessage(res.data);
      setshow(true);
      setTimeout(()=>Navigate("/orders"),1000);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="Cart m-2 d-flex justify-content-center align-items-center">
      <div className="bg-white rounded-3 d-flex flex-wrap m-4 gap-5 border border-success border-3" style={{width:"75rem"}}>
        <div className="m-3 py2">
          <img src={Medicine.imageUrl} alt={Medicine.name} style={{ height: "25rem" }} />
        </div>
        <div className="w-50 d-flex flex-column p-5 bg-info">
          <h2>{Medicine.name}</h2>
          <h6>Price : {Medicine.price}</h6>
          <h6>Remaining Items : {Medicine.quantity}</h6>
          <h6>Exp Date : {date}</h6>
          <div className="d-flex justify-content-around align-items-center gap-2 mt-2" style={{width:"10rem"}}>
            <button className="btn" onClick={decrease}><CiCircleMinus className="text-danger" style={{height:"3rem",width:"3rem"}}/></button>
            <span className="fs-3 text-primary">{Quantity}</span>
            <button className="btn" onClick={increase}><CiCirclePlus className="text-success" style={{height:"3rem",width:"3rem"}}/></button>
          </div>
          <h5 className="text-danger rounded-2 mt-5 mx-0 p-2 ">Total Price: <span className="ms-5"/>{Price}</h5>
          <button className="mt-2 btn btn-success btn-lg" onClick={OrderPlace}>Place Order</button>
        </div>
      </div>
      {show && 
        <div className={"alert d-flex justify-content-between position-absolute top-50 start-50 translate-middle alert-success fs-3"} role="alert">
              {Message}
              <button type="button" className="btn-close" onClick={()=>setshow(false)}></button>
          </div>
      }
    </div>
  );
}

export default BuyItem;
