import { useEffect, useState } from "react";
import Axios from 'axios';

const OrderItem = ({ item,role,timeclass }) => {
    const [User, setUser] = useState();
    const [Medicine, setMedicine] = useState();
    const date = new Date(item.orderTime);

    useEffect(() => {
        if (role === "Admin") {
            findUser();
        }
        findMedicine();
    }, []);

    const findUser = async () => {
        try {
            const res = await Axios.get(`https://localhost:7258/api/Users/${item.userId}`);
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const findMedicine = async () => {
        try {
            const res = await Axios.get(`https://localhost:7258/api/Medicines/${item.medicineId}`);
            setMedicine(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return date.toLocaleString('en-US', options);
    };

    return (
        <div className="row mx-2 p-1 border border-1 border-dark border-top-0">
            {role === "Admin" &&
            <div className="col-3 justify-content-center">{User?.name}</div>
            }
            <div className="col-3 justify-content-center">{Medicine?.name}</div>
            <div className="col-2 justify-content-center">{item.quantity}</div>
            <div className={`${timeclass} justify-content-center`}>{formatDate(date)}</div>
            <div className="col-2 justify-content-center">{item.total}</div>
        </div>
    );
};

export default OrderItem;
