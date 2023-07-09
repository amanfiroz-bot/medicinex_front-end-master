import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthProvider";
import Axios from 'axios';
import OrderItem from "../Components/OrderItem";

const Orders = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);
    const [OrderList, setOrderList] = useState([]);
    const [timeclass,settimeclass]=useState("");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        } else if (user) { // Add conditional check for user object
            findOrderlist();
        }
    }, [isAuthenticated, user]); // Include isAuthenticated and user in dependency array

    const findOrderlist = async () => {
        if (user.Role === "Admin") {
            try {
                const res = await Axios.get("https://localhost:7258/api/Orders");
                setOrderList(res.data); // Access the data property of the response object
                settimeclass("col-2");
            } catch (e) { 
                console.log(e);
            }
        } else {
            try {
                const res = await Axios.get(`https://localhost:7258/api/Orders/GetUserOrder?id=${user.UserId}`);
                setOrderList(res.data); // Access the data property of the response object
                console.log(res.data);
                settimeclass("col-4");
            } catch (e) { 
                console.log(e);
            }
        }
    }

    return (
        <div className="Orderlist">
            <div className="bg-dark mt-2 mx-2 p-2 rounded-2 text-white">
                Orders:
            </div>
            <div className="bg-light mt-2 mx-2 rounded-top-2">
                <div className="row py-1 border-bottom border-3 border-dark mx-0">
                    {user.Role === "Admin" &&
                    <div className="col-3 justify-content-center">Customer Name</div>
                    }
                    <div className="col-3 justify-content-center">Medicine Name</div>
                    <div className="col-2 justify-content-center">Quantity</div>
                    <div className={`${timeclass} justify-content-center`}>Order Time</div>
                    <div className="col-2 justify-content-center">Total Amount</div>
                </div>
                {
                    OrderList.map((item) => (
                        <OrderItem key={item.id} item={item} role={user.Role} timeclass={timeclass} />
                    ))
                }
            </div>
        </div>
    );
}

export default Orders;
