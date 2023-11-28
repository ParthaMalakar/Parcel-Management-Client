import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaAddressBook, FaUtensils } from 'react-icons/fa';
import { AuthContext } from '../../../../provider/Authprovider';

const BookParcel = () => {
    const { register, handleSubmit, reset } = useForm();
    const [price, setPrice] = useState(0);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    console.log(user)
    const onSubmit = async (data) => {
        data.price=price;
        data.bookingDate = new Date();
        data.status = "pending";
        reset();
        console.log(data)
       
            const menuRes = await axiosSecure.post('/parcel', data);
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `parcel is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                 
                                  const menuRes = await axiosSecure.put(`/user/parcel/${user.email}`);
                                  console.log(menuRes.data)
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
        <div className='bg-cyan-500 pt-10 pb-4'>
           <div className="mx-auto text-center md:w-4/12 my-8">
                <p className="text-gray-600 mb-2 text-3xl"><i>---Book a Parcel---</i></p>
            </div>
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
                            defaultValue={user.displayName}
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
                            defaultValue={user.email}
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
                            value={`${price}Tk`}
                            readOnly
                            {...register('price', { required: true })}
                            required
                            className="input input-bordered w-full"
                        />
                    </div> 
                    <button className="btn text-center w-full ">
                        Add Parcel <FaAddressBook className="ml-4"></FaAddressBook>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;