import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaAddressBook, FaUtensils } from 'react-icons/fa';
import { AuthContext } from '../../../../provider/Authprovider';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
const ParcelDetails = () => {
    const parcel = useLoaderData()
    const { register, handleSubmit, reset } = useForm();
    const [price, setPrice] = useState(0);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        
        console.log(data)
       
            const menuRes = await axiosSecure.patch(`/parcel/${parcel._id}`, data);
            console.log(menuRes.data)
            if(menuRes.data.modifiedCount){
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `parcel is Updated.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            
        }
    };
    const calculatePrice = (e) => {
        const weight = parseFloat(e.target.value);
        console.log(weight)
        let newPrice;

        if (weight == 1) {
            newPrice = 50;
        } else if (weight == 2) {
            newPrice = 100;
        } else {
            newPrice = 150;
        }

        setPrice(newPrice);
    };
    return (
        <div>
            <div className='w-1/2 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            readOnly
                            defaultValue={parcel.name}
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            readOnly
                            defaultValue={parcel.Email}
                            {...register('Email', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            defaultValue={parcel.phone}
                            {...register('phone', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Parcel Type</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Parcel Type"
                            defaultValue={parcel.type}
                            {...register('type', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full my-3">
                        <label className="label">
                            <span className="label-text">Parcel Weight</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Parcel Weight"
                            defaultValue={parcel.weight}
                            {...register('weight', { required: true })}
                            onChange={(e) => {
                                register('weight').onChange(e);
                                calculatePrice(e);
                            }}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>  
                    <div className="form-control w-full my-3">
                        <label className="label">
                            <span className="label-text">Receiver’s Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Receiver’s Name"
                            defaultValue={parcel.ReceiverName}
                            {...register('ReceiverName', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full my-3">
                        <label className="label">
                            <span className="label-text">Receiver's Phone Number</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Receiver's Phone Number"
                            defaultValue={parcel.ReceiverPhone}
                            {...register('ReceiverPhone', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>  
                    <div className="form-control w-full my-3">
                        <label className="label">
                            <span className="label-text">Parcel Delivery Address</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Parcel Delivery Address"
                            defaultValue={parcel.parcelAddress}
                            {...register('parcelAddress', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>  
                    <div className="form-control w-full my-3">
                        <label className="label">
                            <span className="label-text">Requested Delivery Date</span>
                        </label>
                        <input
                            type="date"
                            placeholder="Requested Delivery Date"
                            defaultValue={parcel.parcelDate}
                            {...register('parcelDate', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>  

                    <div className="form-control w-full my-3">
                        <label className="label">
                            <span className="label-text">Delivery Address Latitude</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Delivery Address Latitude"
                            defaultValue={parcel.Latitude}
                            {...register('Latitude', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>  
                    <div className="form-control w-full my-3">
                        <label className="label">
                            <span className="label-text">Delivery Address longitude</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Delivery Address longitude"
                            defaultValue={parcel.longitude}
                            {...register('longitude', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div> 
                    <div className="form-control w-full my-3">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Price"
                           
                            defaultValue={parcel.price}
                            readOnly
                            {...register('price', { required: true })}
                            required
                            className="input input-bordered w-full"
                        />
                    </div> 
                    <button className="btn text-center w-full ">
                        Update Parcel <FaAddressBook className="ml-4"></FaAddressBook>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ParcelDetails;