import { useNavigate } from "react-router-dom";
const MedicineItem = ({ item }) => {
    const Navigate = useNavigate();
    const date = new Date(item.expDate).toLocaleDateString();
    return (
      <div className="card m-2 h-25 w-25 bg-success" key={item.id}>
            <img src={item.imageUrl} className="card-img-top" alt={item.name} style={{ height: "12rem"}}/>
          <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Price: {item.price}</p>
          <p className="card-text">Exp Date: {date}</p>
              <button
                    className="btn btn-primary"
                    onClick={()=>Navigate(`buyitem/${item.id}`)}
              >
              Select
              </button>
          </div>
      </div>
    );
}

export default MedicineItem;