import React from 'react';

const Details = ({one}) => {
    const {name,photoURL,delaveryCount,averageReview}=one;
    return (
        <div>
             <div className="card mx-auto mt-4 bg-base-100 shadow-xl">
                <figure className="px-1 pt-3">
                    <img src={photoURL} alt="Shoes" className="rounded-xl md:h-[200px] md:w-[400px]" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-semibold mx-auto">Delivery Man's Name:{name}</h2>
                    <p className="font-semibold">Number of parcel Delivered:{delaveryCount}</p>
                    <p className="font-semibold">Average Ratings:{averageReview}</p>
                   </div>
                   </div>
        </div>
    );
};

export default Details;