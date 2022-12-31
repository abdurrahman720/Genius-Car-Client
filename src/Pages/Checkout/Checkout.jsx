import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Authentication/Context/AuthProvider';

const Checkout = () => {
    const service = useLoaderData(); 
    const {_id, title, price } = service;
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const carDetails = form.carDetails.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customerName: name,
            email,
            phone,
            carDetails,
        }

        fetch('http://localhost:5001/orders', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(response => response.json())
            .then(data => {
                if (data.acknowledged) {
                    console.log(data)
                    alert('order has been placed!')
                    
                }
            })
            .catch(err => {
                console.log(err)
            })
            
    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder} className="my-10">
                <h2 className="text-4xl font-bold text-orange-600 text-center">{title}</h2>
                <h4 className="text-3xl text-center text-orange-400 font-semibold">${price}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name" className="input input-bordered w-full" />
                <input type="text" name="lastName" placeholder="Last Name" className="input input-bordered w-full" />
                <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full" />
                <input type="text" name="email" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full" readOnly />
                </div>
                <div>
                <textarea name="carDetails" className="textarea textarea-bordered h-24 w-full my-5" placeholder="Your Car Details" required/>
                <input className="btn btn-outline btn-warning w-full" type="submit" value="Place Your Order" />
                </div>
           </form>
        </div>
    );
};

export default Checkout;