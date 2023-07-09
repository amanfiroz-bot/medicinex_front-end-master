import { useState } from "react";
import InPut from "./InPut";
import Axios from 'axios';

const AddMedicine = ({show,handleClose}) => {
    const [Medicine,setMedicine]=useState({
        "name": "",
        "imageUrl": "",
        "price": 0,
        "expDate": "",
        "quantity": 0
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMedicine({...Medicine, [name]: value });
      }
    const handleSubmit=async()=>{
        console.log(Medicine);
        try{
            const res =await Axios.post("https://localhost:7258/api/Medicines",Medicine);
            console.log(res);
        }catch(e){
            console.log(e);
        }
        setMedicine({
            "name": "",
            "imageUrl": "",
            "price": 0,
            "expDate": "",
            "quantity": 0
        });
        handleClose();
    }
    return (
        <div
        className={`modal ${show ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        >
        <div className="modal-dialog border-light" role="document" style={{marginTop:"7rem"}}>
            <div className="modal-content">
            <div className="modal-header bg-dark text-light">
                <h5 className="modal-title">Medicine Details</h5>
                <button
                type="button"
                className="btn-close bg-light"
                onClick={handleClose}
                aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                <InPut
                label="Name"
                labelclass="form-label"
                input={{
                    type: "text",
                    name: "name",
                    className: "form-control",
                    placeholder: "Name",
                    onChange: handleInputChange,
                    value: Medicine.name
                }}/>
                <InPut
                label="Image Url"
                labelclass="form-label"
                input={{
                    type: "text",
                    name: "imageUrl",
                    className: "form-control",
                    placeholder: "Image Link",
                    onChange: handleInputChange,
                    value: Medicine.imageUrl
                }}/>
                <InPut
                label="Price"
                labelclass="form-label"
                input={{
                    type: "number",
                    name: "price",
                    className: "form-control",
                    // placeholder: "Image Link",
                    onChange: handleInputChange,
                    value: Medicine.price
                }}/>
                <InPut
                label="Exp. Data"
                labelclass="form-label"
                input={{
                    type: "date",
                    name: "expDate",
                    className: "form-control",
                    // placeholder: "Image Link",
                    onChange: handleInputChange,
                    value: Medicine.expDate
                }}/>
                <InPut
                label="Quantity"
                labelclass="form-label"
                input={{
                    type: "number",
                    name: "quantity",
                    className: "form-control",
                    // placeholder: "Image Link",
                    onChange: handleInputChange,
                    value: Medicine.quantity
                }}/>
            </div>
            <div className="modal-footer">
                <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
                >
                Close
                </button>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Add Medicine
                </button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default AddMedicine;
