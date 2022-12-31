import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, serviceName, price, email, carDetails, customerName, phone, service, status } = order;

    const [orderedService, setOrderedService] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5001/services/${service}`)
            .then(response => response.json())
            .then(data => {setOrderedService(data)})

    },[service])

    

    return (
        <tr>
        <th>
          <label>
           <button onClick={()=>handleDelete(_id)} className='btn btn-ghost'>x</button>
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                            {
                                orderedService?.img && <img
                                    className='w-24 rounded'
                                src={orderedService?.img}
                                alt="Avatar Tailwind CSS Component"
                              />
               }
              </div>
            </div>
            <div>
                        <div className="font-bold">{serviceName }</div>
              <div className="text-sm opacity-50">{carDetails}</div>
            </div>
          </div>
        </td>
        <td>
         {customerName}
          <br />
          <span className="badge badge-ghost badge-sm">
                    {email} <br />
                    {phone}
          </span>
        </td>
            <td>${price }</td>
        <th>
                <button onClick={()=>handleStatusUpdate(_id)} className="btn btn-ghost btn-xs">
                   {status? status : "pending"}
                </button>
        </th>
      </tr>
    );
};

export default OrderRow;