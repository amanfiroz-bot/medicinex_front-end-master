import { useState } from "react";
import UpdateMedicine from "./UpdateMedicine";

const MMedicineItem = ({item}) => {
    const date = new Date(item.expDate).toLocaleDateString();
    const [show,setshow]=useState(false);
    const updatehandle=()=>{
        setshow(!show);
    }
    return (
        <div className="MMedicine row my-1 border border-dark mx-1 rounded">
            <div className="col-2 border border-dark border-2 rounded-2">
                <img src={item.imageUrl} alt={item.name} style={{height:"10rem",width:"10rem"}}/>
            </div>
            <div className="col-7 p-3 ms-3 bg-info border border-dark">
                <div className="Name fs-5">{item.name}</div>
                <div className="">Price: <span className="text-danger">Rs. {item.price}</span></div>
                <div>Exp. Date: {date}</div>
                <div>Quantity: {item.quantity}</div>
            </div>
            <div className="col-2 mx-3 mt-5 d-flex justifuy-content-center align-items-center flex-column">
                <button className="btn btn-outline-success btn-lg py-1 border" onClick={updatehandle}>Update</button>
                {
                    item.quantity===0 &&
                    <h6 className="text-danger mt-1">OUT OF STOCK ADD IT</h6>
                }
            </div>
            <UpdateMedicine item={item} show={show} handleClose={updatehandle}/>
        </div>
    );
}

export default MMedicineItem
