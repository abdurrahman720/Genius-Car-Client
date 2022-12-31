import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const {_id, img, title, price } = service;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-orange-600 text-2xl">Price: ${price}</p>
        <div className="card-actions justify-end">
          <Link to={`/checkout/${_id}`}><button className="btn btn-primary">Buy Now</button></Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
