import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Authentication/Context/AuthProvider';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState({});

    useEffect(() => {
        fetch( `http://localhost:5001/orders?email=${user.email}`)
            .then(response => response.json())
            .then(data => setOrders(data))
        
    },[user?.email])


    return (
        <div>
            <h2 className="text-3xl font-bold">Your have <span className="text-orange-600 font-bold">{orders.length }</span></h2>
        </div>
    );
};

export default Orders;