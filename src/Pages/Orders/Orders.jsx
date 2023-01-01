import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/Context/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(
      `https://genius-car-server-liard-iota.vercel.app/orders?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("genius-token")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("genius-token");
          return logOut();
        }
        return response.json();
      })
      .then((data) => {
        console.log("recived", data);
        setOrders(data);
      });
  }, [user?.email, logOut]);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure to delete this order?");
    if (proceed) {
      fetch(`https://genius-car-server-liard-iota.vercel.app/orders/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.deletedCount >= 1) {
            alert("Ordered deleted successfully");
            const remaining = orders.filter((odr) => odr._id !== id);
            setOrders(remaining);
          }
        });
    }
  };

  const handleStatusUpdate = (id) => {
    fetch(`https://genius-car-server-liard-iota.vercel.app/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const remaining = orders.filter((odr) => odr._id !== id);
          const approved = orders.find((odr) => odr._id === id);
          approved.status = "approved";
          const newOrders = [approved, ...remaining];
          setOrders(newOrders);
          console.log(data);
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center">
        Your have{" "}
        <span className="text-orange-600 font-bold">{orders.length}</span>{" "}
        Orders
      </h2>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Service Name</th>
              <th>Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                handleDelete={handleDelete}
                handleStatusUpdate={handleStatusUpdate}
              ></OrderRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
