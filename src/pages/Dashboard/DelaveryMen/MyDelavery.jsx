import { useQuery } from "@tanstack/react-query";

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";

const MyDelavery = () => {
    const [number, setNumber] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    console.log('ggggg', user)
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcel'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/count/${user.email}`, {
            });
            return res.data;
        },
    });



    return (
        <div className="">
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">ALL</h2>
                <h2 className="text-3xl">Total My Devavery: {parcels.length}</h2>
            </div>

            

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Booked User Name</th>
                            <th>Receivers Name</th>
                            <th>Booked User’s Phone</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Recievers phone number</th>
                            <th>Receivers Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels?.map((user1, index) => (
                                <tr key={user1._id}>
                                    <th>{index + 1}</th>
                                    <td>{user1.name}</td>
                                    <td>{user1.ReceiverName}</td>
                                    <td>{user1.phone}</td>
                                    <td>{user1?.parcelDate}</td>
                                    <td>{user1?.delaveryDate}</td>
                                   <td>{user1.ReceiverPhone}</td>
                                    <td>{user1.parcelAddress}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDelavery;